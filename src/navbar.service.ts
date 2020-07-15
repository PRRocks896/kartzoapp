export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa fa-desktop fs-16',
        type: 'link',
      },
      {
        name: 'User Management',
        id: 'usermanagement',
        icon: 'fa fa-user fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'User',
            url: '/users'
          },
          {
            name: 'Role',
            url: '/userrole'
          },
          {
            name: 'Role Privileges',
            url: '/userroletorights'
          },
        ]
      },
      {
        name: 'Category Management',
        id: 'categorymanagement',
        icon: 'fa fa-list fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Category',
            url: '/category'
          },
          {
            name: 'Sub Category',
            url: '/subcategory'
          }
        ]
      },
      {
        name: 'Location Management',
        id: 'locationmanagement',
        icon: 'fa fa-location-arrow fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Country Management',
            url: '/country'
          },
          {
            name: 'State Management',
            url: '/state'
          },
          {
            name: 'City Management',
            url: '/city'
          }
        ]
      },
      {
        name: 'Coupon Management',
        url: '/coupon',
        icon: 'fa fa-gift fs-16',
        type: 'link'
      },
      {
        name: 'Merchant Management',
        id: 'merchantmanagement',
        icon: 'fa fa-location-arrow fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Merchant Management',
            url: '/merchant'
          },
          {
            name: 'Business Management',
            url: '/merchant-business'
          },
          {
            name: 'Review Management',
            url: '/list-merchant-review'
          }
        ]
      },
      {
        name: 'Product Management',
        id: 'productmanagement',
        icon: 'fa fa-shopping-cart fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Product Management',
            url: '/list-product'
          },
          {
            name: 'Image Management',
            url: '/list-product-image'
          },
          {
            name: 'Inventory Management',
            url: '/list-product-inventory'
          },
          {
            name: 'Review Management',
            url: '/list-product-review'
          },
          {
            name: 'AddOn Management',
            url: '/product-addondetail'
          }
        ]
      },
      {
        name: 'Delivery Management',
        url: '/delivery',
        icon: 'fa fa-truck fs-16',
        type: 'link'
      },
      {
        name: 'Order Management',
        id: 'ordermanagement',
        icon: 'fa fa-list-alt fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Order Management',
            url: '/list-order'
          },
          {
            name: 'Cart Management',
            url: '/order-cart'
          }
        ]
      },
    ],
  };