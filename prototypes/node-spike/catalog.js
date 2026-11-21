export const profiles = {
  for_her: ['lip', 'spa'],
  for_him: ['gadget', 'fragrance'],
};

const items = {
  toilet: { label: 'Bồn cầu biết hát', icon: '🚽', joke: 'Có cả chế độ song ca.', kind: 'decoy' },
  lip: { label: 'Son và trang điểm', icon: '💄', joke: 'Tôi phân biệt được ít nhất hai màu.', gift: 'Set son mini', tip: 'Xem tông màu người ấy dùng thường xuyên.' },
  spa: { label: 'Spa và thư giãn', icon: '🫧', joke: 'Tôi cũng từng spa. Máy chủ tắt đúng ba phút.', gift: 'Voucher massage có ngày dùng linh hoạt', tip: 'Chọn nơi thuận đường và có thể đổi lịch.' },
  gadget: { label: 'Công nghệ và gadget', icon: '🎧', joke: 'Tôi có họ hàng xa ở cổng USB.', gift: 'Đế sạc không dây', tip: 'Kiểm tra điện thoại có hỗ trợ sạc không dây.' },
  fragrance: { label: 'Nước hoa và chăm sóc cá nhân', icon: '🧴', joke: 'Tôi ngửi bằng trí tưởng tượng.', gift: 'Bộ mẫu nước hoa', tip: 'Xem người ấy hay dùng mùi gỗ hay mùi tươi.' },
};

export function makeDeck(profile) {
  return ['toilet', ...profiles[profile]].map(id => ({ id, ...items[id] }));
}
