export default {
  get (key) {
    const match = document.cookie.match(new RegExp(key + '=([^;]+)'));
    return match ? match[1] : '';
  }
};
