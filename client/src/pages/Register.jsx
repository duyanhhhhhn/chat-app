import { Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiHeartLine, RiStarLine, RiUserAddLine } from "react-icons/ri";

export default function Register() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isregisterLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400/20 to-red-600/20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-700/30 rounded-full transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white/10 rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-0">
        <div className="flex-1 flex justify-start items-center">
          <div className="relative">
            <div className="w-80 h-80 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-black text-4xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="w-20 h-6 bg-black rounded-full"></div>
                </div>
              </div>
              <div className="absolute -left-8 top-1/3 transform -translate-y-1/2">
                <div className="w-16 h-4 bg-green-500 rounded-full transform -rotate-45"></div>
              </div>
              <div className="absolute -right-8 top-1/3 transform -translate-y-1/2">
                <div className="w-16 h-4 bg-green-500 rounded-full transform rotate-45"></div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <div className="w-6 h-16 bg-red-600 rounded-full"></div>
                <div className="w-6 h-16 bg-red-600 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-12 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <RiUserAddLine className="text-white w-4 h-4" />
            </div>
            <div className="absolute -bottom-4 -left-8 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <RiStarLine className="text-white w-3 h-3" />
            </div>
            <div className="absolute top-1/4 -right-12 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <RiHeartLine className="text-white w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <h1 className="text-white text-5xl font-bold leading-tight mb-8">
            Tham gia cộng đồng
            <br />
            Chat cùng nhau
            <div className="inline-flex items-center ml-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <RiUserAddLine className="text-white text-xl w-6 h-6" />
              </div>
            </div>
          </h1>
          <form
            onSubmit={registerUser}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md ml-auto"
          >
            <h2 className="text-white text-2xl font-semibold mb-6">Đăng Ký</h2>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <input
                  name="name"
                  placeholder="Tên của bạn"
                  className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/20 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={registerInfo.name}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative">
                <input
                  name="email"
                  placeholder="Email của bạn"
                  className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/20 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  value={registerInfo.email}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative">
                <input
                  name="password"
                  placeholder="Mật khẩu"
                  className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/20 border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  value={registerInfo.password}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-colors flex items-center justify-center px-4 py-2 text-sm w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              {isregisterLoading ? "Đang tải..." : "Đăng Ký"}
            </button>
            <div className="mt-6 text-center">
              <span className="text-white/80 text-sm">Đã có tài khoản? </span>
              <div
                className="text-white hover:underline text-sm font-medium inline"
                onClick={() => navigate("/login")}
              >
                Đăng nhập ngay
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute top-6 right-6">
        {registerError?.error && (
          <Alert
            variant="filled"
            color="red"
            radius="md"
            style={{ width: "100%" }}
            title="Error"
          >
            <p>{registerError?.message}</p>
          </Alert>
        )}
      </div>
    </div>
  );
}
