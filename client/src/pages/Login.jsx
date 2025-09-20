import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RiChat3Line, RiMessageLine } from "react-icons/ri";
import { Alert } from "@mantine/core";

export default function Login() {
  const { loginError, loginUser, loginInfo, updateLoginInfo, isloginLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700/30 rounded-full transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full"></div>
      </div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-0">
        <div className="flex-1 max-w-xl">
          <h1 className="text-white text-5xl font-bold leading-tight mb-8">
            Welcome to Chat app
            <br /> make by Duy Anh
            <div className="inline-flex items-center ml-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <RiChat3Line className="text-white text-xl" />
              </div>
            </div>
          </h1>

          <form
            onSubmit={loginUser}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md"
          >
            <h2 className="text-white text-2xl font-semibold mb-6">
              Đăng Nhập
            </h2>
            <div className="space-y-4 mb-6">
              <div className="relative">
                <input
                  name="email"
                  placeholder="Email của bạn"
                  className="w-full px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 text-sm bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-white/50"
                  type="email"
                  value={loginInfo.email}
                  onChange={(e) =>
                    updateLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <input
                  name="password"
                  placeholder="Mật khẩu"
                  className="w-full px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 text-sm bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-white/50"
                  type="password"
                  value={loginInfo.password}
                  onChange={(e) =>
                    updateLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="whitespace-nowrap cursor-pointer font-medium rounded-lg transition-colors flex items-center justify-center px-4 py-2 text-sm w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              {isloginLoading ? "Đang đăng nhập" : "Đăng nhập"}
            </button>
            <div className="mt-6 text-center"></div>
            <div className="mt-4 text-center">
              <span className="text-white/80 text-sm">Chưa có tài khoản? </span>
              <div
                onClick={() => navigate("/register")}
                className="text-white hover:underline text-sm font-medium inline"
              >
                Đăng ký ngay
                <div />
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1 flex justify-end items-center">
          <div className="relative">
            <div className="w-80 h-80 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-black text-4xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                  <div className="w-16 h-8 bg-black rounded-full"></div>
                </div>
              </div>
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                <div className="w-16 h-4 bg-orange-500 rounded-full transform -rotate-12"></div>
              </div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                <div className="w-16 h-4 bg-orange-500 rounded-full transform rotate-12"></div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <div className="w-6 h-16 bg-blue-600 rounded-full"></div>
                <div className="w-6 h-16 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-8 -left-8 w-12 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <RiChat3Line className="text-white w-4 h-4" />
            </div>
            <div className="absolute -top-4 right-8 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <RiMessageLine className="text-white w-3 h-3" />
            </div>
          </div>
        </div>
      </main>
      <div className="absolute top-6 right-6 z-10">
        {loginError?.error && (
          <Alert variant="filled" color="red" title="Error">
            {loginError?.message}
          </Alert>
        )}
      </div>
    </div>
  );
}
