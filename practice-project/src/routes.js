import React from 'react';

import AdminHomePage from './pages/admin/AdminHomePage/AdminHomePage';
import AdminPictureListPage from './pages/admin/AdminPictureListPage/AdminPictureListPage';
import AdminActionPicturePage from './pages/admin/AdminActionPicturePage/AdminActionPicturePage';

const routes = [
  {
    path: '/admin',
    exact: true,
    main: () => <AdminHomePage />
  },
  {
    path: '/admin/picture-list',
    exact: false,
    main: () => <AdminPictureListPage />
  },
  {
    path: '/admin/add-picture',
    exact: false,
    main: ({history}) => <AdminActionPicturePage history={history} />
  }
];

export default routes;