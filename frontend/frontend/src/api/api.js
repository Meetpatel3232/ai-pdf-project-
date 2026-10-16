export const loginUser=async(credetials)=>{
    const response=await api.post("/auth/Login",credentials);
    return response.data;
}

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};