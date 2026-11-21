import { readdirSync, readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export function createLocalDatabase() {
  const sql = new DatabaseSync(':memory:');
  const migrations = new URL('../drizzle/', import.meta.url);
  for (const name of readdirSync(migrations).filter(name => name.endsWith('.sql')).sort()) {
    sql.exec(readFileSync(new URL(name, migrations), 'utf8'));
  }

  return {
    prepare(query) {
      const statement = sql.prepare(query);
      return {
        bind: (...args) => ({
          first: () => statement.get(...args),
          run: () => ({ meta: statement.run(...args) }),
        }),
      };
    },
    batch(statements) {
      sql.exec('BEGIN');
      try {
        const results = statements.map(statement => statement.run());
        sql.exec('COMMIT');
        return results;
      } catch (error) {
        sql.exec('ROLLBACK');
        throw error;
      }
    },
    close: () => sql.close(),
  };
}
