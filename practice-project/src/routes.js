import React from 'react';

import AdminHomePage from './pages/admin/AdminHomePage/AdminHomePage';
import AdminHomePageNew from './pages/admin/AdminHomePage/AdminHomePageNew';
import AdminPictureListPage from './pages/admin/AdminPictureListPage/AdminPictureListPage';
import AdminActionPicturePage from './pages/admin/AdminActionPicturePage/AdminActionPicturePage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <AdminHomePage />
  },
  {
    path: '/new',
    exact: true,
    main: () => <AdminHomePageNew />
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
  },
  {
    path: '/admin/edit/:id',
    exact: false,
    main: ({history, match}) => <AdminActionPicturePage history={history} match={match} />
  },
  {
    path: '',
    exact: false,
    main: () => <NotFoundPage />
  }
];

export default routes;