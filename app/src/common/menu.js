import { isUrl } from '../utils/utils';

/* const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: 'Monitor',
    path: 'monitor',
  },{
    name: 'Analysis',
    path: 'analysis',
  },  {
      name: 'workplace',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: 'Form',
  icon: 'form',
  path: 'form',
  children: [{
    name: 'Basic form',
    path: 'basic-form',
  }, {
    name: 'Step form',
    path: 'step-form',
  }, {
    name: 'Advanced form',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, {
  name: 'Table',
  icon: 'table',
  path: 'list',
  children: [{
    name: 'Table List',
    path: 'table-list',
  }, {
    name: 'Basic List',
    path: 'basic-list',
  }, {
    name: 'Card List',
    path: 'card-list',
  }, {
    name: 'Serach',
    path: 'search',
    children: [{
      name: 'Articles',
      path: 'articles',
    }, {
      name: 'Projects',
      path: 'projects',
    }, {
      name: 'Applications',
      path: 'applications',
    }],
  }],
}, {
  name: 'Profile',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: 'Basic',
    path: 'basic',
  }, {
    name: 'Advanced',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: 'Results page',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: 'Success',
    path: 'success',
  }, {
    name: 'fail',
    path: 'fail',
  }],
}, {
  name: 'warning',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: 'trigger',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: 'User',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: 'Login',
    path: 'login',
  }, {
    name: 'Register',
    path: 'register',
  }, {
    name: 'Registration result',
    path: 'register-result',
  }],
  
}]; */


const menuData = [{
  name: 'Home',
  icon: 'home',
  path: 'home'
},{
  name: 'Orders',
  icon: 'form',
  path: '/orders'
  /* children: [{
    name: 'View Order',
    authority: 'admin',
    path: 'view-order',
  }], */
},{
  name: 'Discounts',
  icon: 'tags-o',
  path: '/discounts/list',
  authority:'admin'
  /* children: [{
    name: 'View Order',
    authority: 'admin',
    path: 'view-order',
  }], */
}];

/*
,  {
  name: 'User',
  icon: 'user',
  path: 'user',
  authority: 'admin',
  children: [{
    name: 'Login',
    path: 'login',
  }, {
    name: 'Register',
    path: 'register',
  }, {
    name: 'Registration result',
    path: 'register-result',
    }, {
      name: 'Table',
      icon: 'table',
      path: 'list',
      children: [{
        name: 'Table List',
        path: 'table-list',
      }, {
        name: 'Basic List',
        path: 'basic-list',
      }, {
        name: 'Card List',
        path: 'card-list',
      }, {
        name: 'Serach',
        path: 'search',
        children: [{
          name: 'Articles',
          path: 'articles',
        }, {
          name: 'Projects',
          path: 'projects',
        }, {
          name: 'Applications',
          path: 'applications',
        }],
      }],
    }],
}
*/

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
