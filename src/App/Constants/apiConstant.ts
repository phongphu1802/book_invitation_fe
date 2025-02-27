export const LANGUAGE_API_PATH = {
  LANGUAGES: "languages",
  LANGUAGE: "language",
  LANGUAGE_ID: "language/:id",
};

export const CONFIG_API_PATH = {
  CONFIGS: "api/configs",
};

export const AUTH_API_PATH = {
  LOGIN: "login",
  REGISTER: "register",
  FORGET_PASSWORD: "auth/forget-password",
  RESET_PASSWORD: "auth/reset-password",
  REFRESH_TOKEN: "v1/access-token",
  ME: "me",
};

export const COMMON_API_PATH = {
  UPLOAD_IMAGE: "v1/upload",
};

export const CATEGORY_API_PATH = {
  CATEGORIES: "categories",
  CATEGORY: "category",
  CATEGORY_ID: (id: number) => `category/${id}`,
};

export const USER_API_PATH = {
  USERS: "users",
  USER: "user",
  USER_ID: (id: number) => `user/${id}`,
};

export const ROLE_API_PATH = {
  ROLES: "roles",
  ROLE: "role",
  ROLE_ID: (id: number) => `role/${id}`,
};

export const PRODUCT_API_PATH = {
  PRODUCTS: "products",
  PRODUCT: "product",
  PRODUCT_ID: (id: number) => `product/${id}`,
};

export const COURSE_API_PATH = {
  COURSES: "courses",
  COURSE: "course",
  COURSE_ID: (id: number) => `course/${id}`,
};

export const STUDENT_API_PATH = {
  STUDENTS: "students",
  STUDENT: "student",
  STUDENT_ID: (id: number) => `student/${id}`,
};

export const TEACHER_API_PATH = {
  TEACHERS: "teachers",
  TEACHER: "teacher",
  TEACHER_ID: (id: number) => `teacher/${id}`,
};

export const ROOM_API_PATH = {
  ROOMS: "rooms",
  ROOM: "room",
  ROOM_ID: (id: number) => `room/${id}`,
};

export const ORDER_API_PATH = {
  ORDERS: "orders",
  ORDER: "order",
  ORDER_ID: (id: number) => `order/${id}`,
};

export const DASHBOARD_API_PATH = {
  PRODUCT: "product-statistics",
  TOP_USER: "user-statistics",
  PROFIT: "profit-statistics",
  USER_REGISTER: "user-register-statistics",
};
