const suggestions = {
  vi: {
    1: ['Nến đậu nành hũ nhỏ hương trà trắng', 'Bộ ba nến mini thử mùi', 'Nến sáp ong không hương trong hũ có nắp', 'Hỏi khéo họ thích mùi gỗ, hoa hay cam chanh. Chưa chắc thì chọn hũ nhỏ hoặc loại không hương.'],
    2: ['Vé buổi nặn cốc bằng tay', 'Vé thử bàn xoay dành cho người mới', 'Voucher tô men gốm cho hai người', 'Kiểm tra giá đã gồm nung và tráng men chưa, cùng ngày có thể lấy sản phẩm.'],
    3: ['Bộ cà phê phin túi lọc từ ba vùng', 'Túi hạt rang vừa 200 g', 'Hộp cà phê túi lọc cold brew', 'Xem họ pha bằng dụng cụ gì rồi chọn hạt nguyên, bột xay đúng cỡ hoặc túi lọc.'],
    4: ['Hai vé sân nhà của đội họ thích', 'Vé một trận cầu địa phương cuối tuần', 'Voucher vé linh hoạt từ nhà bán chính thức', 'Xác nhận đội, ngày rảnh và khu ghế. Kiểm tra điều kiện đổi tên hoặc chuyển vé trước khi mua.'],
  },
  en: {
    1: ['Small white-tea soy candle', 'Three-scent mini candle set', 'Unscented beeswax candle in a lidded jar', 'Find out if they like woody, floral or citrus notes. If unsure, pick a small jar or go unscented.'],
    2: ['Hand-built mug workshop ticket', 'Beginner pottery-wheel session', 'Pottery glazing voucher for two', 'Check whether firing and glazing are included and when the piece can be picked up.'],
    3: ['Drip coffee sampler from three regions', '200 g bag of medium-roast beans', 'Box of cold-brew coffee bags', 'Check how they brew, then choose whole beans, the matching grind or ready-to-use bags.'],
    4: ['Two home-game tickets for their favourite team', 'Tickets to a local weekend match', 'Flexible ticket voucher from an official seller', 'Confirm their team, availability and seating section. Check ticket transfer rules before paying.'],
  },
  zh: {
    1: ['白茶香小罐大豆蜡烛', '三种香型迷你蜡烛套装', '带盖小罐无香蜂蜡蜡烛', '先了解对方喜欢木香、花香还是柑橘香。拿不准时，选小罐或无香款。'],
    2: ['手捏陶杯体验券', '零基础拉坯课', '双人陶器上釉体验券', '确认价格是否包含烧制和上釉，以及成品领取时间。'],
    3: ['三个产区的挂耳咖啡试饮装', '200 克中度烘焙咖啡豆', '盒装冷萃咖啡包', '先了解对方的冲煮工具，再选咖啡豆、合适粗细的咖啡粉或咖啡包。'],
    4: ['喜欢球队的两张主场门票', '周末本地球赛门票', '官方渠道可灵活兑换的观赛券', '确认支持的球队、空闲日期和座位区。买前查看门票转让规则。'],
  },
};

export function giftSuggestions(lang, id) {
  const entry = suggestions[lang][id];
  if (!entry) return null;
  return { ideas: entry.slice(0, 3), tip: entry[3] };
}
