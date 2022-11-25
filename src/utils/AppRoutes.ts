import React from "react";

const AppRoutes = {
    Home: React.lazy(() => import('../pages/home')),
    Profile: React.lazy(() => import('../pages/profile')),
}

export default AppRoutes