const navigationRoute = [
    { name: "Home", route: "/" },
    { name: "Dashboard", route: "/dashboard" },
    { name: "Courses", route: "/courses" },
    { name: "Informations", route: "/informations" },
    { name: "Profile", route: "/profile" },
  ];


const API_URI = process.env.NEXT_PUBLIC_PROD_API_URL;
export {navigationRoute, API_URI}