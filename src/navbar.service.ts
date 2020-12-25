export default {
    items: [
      {
        name:'General',
        type:'header'
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa fa-desktop fs-16',
        type: 'link',
      },
      {
        name:'User Management',
        type:'header'
      },
      {
        name: 'User',
        icon: 'fa fa-user fs-16',
        url: '/users',
        type:'simple'
      },
      {
        name: 'Role',
        icon: 'fa fa-user fs-16',
        url: '/userrole',
        type:'simple'
      },
      {
        name: 'Role Privileges',
        icon: 'fa fa-user fs-16',
        url: '/userroletorights',
        type:'simple'
      },
      {
        name: 'Menu',
         icon: 'fa fa-user fs-16',
        url: '/listmenu'
      },
      // {
      //   name: 'User',
      //   id: 'usermanagement',
      //   icon: 'fa fa-user fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'User',
      //       url: '/users'
      //     },
      //     {
      //       name: 'Role',
      //       url: '/userrole'
      //     },
      //     {
      //       name: 'Role Privileges',
      //       url: '/userroletorights'
      //     },
      //   ]
      // },
      {
        name:'Category Management',
        type:'header'
      },
      {
        name: 'Category',
        url: '/category',
        icon: 'fa fa-list fs-16',
        type:'simple'
      },
      {
        name: 'Sub Category',
        url: '/subcategory',
        icon: 'fa fa-list fs-16',
        type:'simple'
      },
      {
        name:'Location Management',
        type:'header'
      },
      {
        name: 'Country',
         icon: 'fa fa-location-arrow fs-16',
        url: '/country'
      },
      {
        name: 'State',
         icon: 'fa fa-location-arrow fs-16',
        url: '/state'
      },
      {
        name: 'City',
         icon: 'fa fa-location-arrow fs-16',
        url: '/city'
      },
      {
        name:'Coupon Management',
        type:'header'
      },
      {
        name: 'Coupon',
         icon: 'fa fa-gift fs-16',
        url: '/listcoupon'
      },
      {
        name: 'Coupon Mapping',
         icon: 'fa fa-gift fs-16',
        url: '/list-coupon-map'
      },
      {
        name:'Setting Management',
        type:'header'
      },
      {
        name: 'Setting',
         icon: 'fa fa-cog fs-16',
        url: '/list-setting'
      },
      {
        name: 'Tax',
         icon: 'fa fa-cog fs-16',
        url: '/list-tax'
      },
      {
        name: 'Payout',
         icon: 'fa fa-cog fs-16',
        url: '/list-payout'
      },
      {
        name: 'HomeSlider',
         icon: 'fa fa-cog fs-16',
        url: '/list-slider'
      },
      {
        name: 'Fee',
         icon: 'fa fa-cog fs-16',
        url: '/list-fee'
      },
      {
        name: 'Distance-Matrix',
         icon: 'fa fa-cog fs-16',
        url: '/list-matrix'
      },
      {
        name:'Merchant Management',
        type:'header'
      },
      {
        name: 'Merchant',
        icon: 'fa fa-location-arrow fs-16',
        url: '/list-merchant'
      },
      // {
      //   name: 'Business',
      //   icon: 'fa fa-location-arrow fs-16',
      //   url: '/list-business-hours'
      // },
      // {
      //   name: 'Review',
      //   icon: 'fa fa-location-arrow fs-16',
      //   url: '/list-merchant-review'
      // },
      {
        name:'Product Management',
        type:'header'
      },
      {
        name: 'Product',
         icon: 'fa fa-shopping-cart fs-16',
        url: '/list-product'
      },
      {
        name: 'Customise',
         icon: 'fa fa-shopping-cart fs-16',
        url: '/list-product-customise'
      },
      {
        name: 'Customise Type',
         icon: 'fa fa-shopping-cart fs-16',
        url: '/list-type'
      },
      // {
      //   name: 'Image',
      //    icon: 'fa fa-shopping-cart fs-16',
      //   url: '/list-product-image'
      // },
      // {
      //   name: 'Inventory',
      //    icon: 'fa fa-shopping-cart fs-16',
      //   url: '/list-product-inventory'
      // },
      // {
      //   name: 'Review',
      //    icon: 'fa fa-shopping-cart fs-16',
      //   url: '/list-product-review'
      // },
     
      // {
      //   name: 'Product',
      //   id: 'productmanagement',
      //   icon: 'fa fa-shopping-cart fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'Product',
      //       url: '/list-product'
      //     },
      //     {
      //       name: 'Image',
      //       url: '/list-product-image'
      //     },
      //     {
      //       name: 'Inventory',
      //       url: '/list-product-inventory'
      //     },
      //     {
      //       name: 'Review',
      //       url: '/list-product-review'
      //     },
      //     {
      //       name: 'AddOn',
      //       url: '/product-addondetail'
      //     }
      //   ]
      // },
      // {
      //   name: 'Delivery',
      //   url: '/delivery',
      //   icon: 'fa fa-truck fs-16',
      //   type: 'link'
      // },
      // {
      //   name: 'Order',
      //   id: 'ordermanagement',
      //   icon: 'fa fa-list-alt fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'Order',
      //       url: '/list-order'
      //     },
      //     {
      //       name: 'Cart',
      //       url: '/list-cart'
      //     }
      //   ]
      // },
      // {
      //   name: 'Customer',
      //   id: 'customermanagement',
      //   icon: 'fa fa-users fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'User',
      //       url: '/list-user'
      //     },
      //     {
      //       name: 'Address',
      //       url: '/list-address'
      //     },
      //     {
      //       name: 'Card',
      //       url: '/list-card'
      //     }
      //   ]
      // }
    ],
  };