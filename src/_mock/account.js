// ----------------------------------------------------------------------
const data = localStorage.getItem('data')
const parsedData = JSON.parse(data)

export const account = {
  displayName: parsedData?.data?.name,
  email: parsedData?.data?.email,
  photoURL: '/assets/images/profile.jpg',
  role: parsedData?.data?.role
};
