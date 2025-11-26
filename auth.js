// auth.js - File helper để bảo vệ các trang HTML
// Thêm script này vào đầu các trang cần bảo vệ: <script src="auth.js"></script>

// Hàm kiểm tra xác thực
function checkAuth() {
  const token = localStorage.getItem('authToken');
  const currentUser = localStorage.getItem('currentUser');

  if (!token || !currentUser) {
    // Chưa đăng nhập, chuyển về trang login
    window.location.href = 'login.html';
    return false;
  }

  return true;
}

// Hàm lấy thông tin user hiện tại
function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

// Hàm đăng xuất
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

// Hàm kiểm tra token có hợp lệ không (optional - có thể mở rộng)
function isTokenValid() {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    // Giải mã token (simple base64)
    const decoded = atob(token);
    const [username, timestamp] = decoded.split(':');

    // Kiểm tra token có quá 24 giờ không (optional)
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 giờ

    return tokenAge < maxAge;
  } catch (e) {
    return false;
  }
}

// Tự động kiểm tra khi trang load
document.addEventListener('DOMContentLoaded', function () {
  // Bỏ qua kiểm tra cho trang login và register
  const currentPage = window.location.pathname;
  console.log(currentPage);
  if (currentPage.includes('login.html')) {
    return;
  }

  // Kiểm tra xác thực cho các trang khác
  checkAuth();
});