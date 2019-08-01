import Vue from 'vue';

const DEFAULT_PLACEHOLDER = '--';

Vue.filter('placeholder', function (value, placeholder) {
  if (value || value === 0) return value;
  return placeholder || DEFAULT_PLACEHOLDER;
});
