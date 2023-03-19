export function getMenus() {
  return [
    {
      code: '10',
      path: '/homepage/index',
      // 首页
      name: 'home',
      icon: 'HomeFilled'
    },
    {
      code: '20',
      path: '/chat/index',
      name: 'ChatGPT',
      icon: 'ChatLineRound'
    },
    {
      code: '30',
      path: '/naming/index',
      // 起名
      name: 'name',
      icon: 'MagicStick'
    },
    {
      code: '40',
      path: '/guess/index',
      // 猜东西
      name: 'guess',
      icon: 'Hide'
    },
    // {
    //   code: '50',
    //   path: '/extract/index',
    //   name: '提取文本',
    //   icon: 'Hide'
    // },
    {
      code: '99',
      path: '/setting/index',
      // 设置
      name: 'setting',
      icon: 'Setting'
    }
  ]
}
