import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/api";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("email tidak valid").required("email wajib diisi"),
      password: Yup.string().min(8, "Password minimal 8 karakter").required("password wajib diisi"),
    }),
    onSubmit: async (values) => {
      try {
        setIsFetching(true)
        const response = await loginUser({
          email: values.email,
          password: values.password,
        });
        dispatch(login(response.data));

        localStorage.setItem('token', response.data.data.token)
        navigate("/");
        toast.success(response.data.message);
      } catch (err) {
        setError("Username atau password salah")
        setShowAlert(true);
        console.error(err);
      } finally{
        setIsFetching(false)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

    {error && showAlert &&
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
              <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
        </div>
            }


      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <MdAlternateEmail />
          </span>
          <input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            placeholder="Masukkan email Anda"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-end">
          {formik.errors.email && formik.touched.email && (
            <div className="text-danger pt-1 small">{formik.errors.email}</div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <MdLockOutline />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...formik.getFieldProps("password")}
            placeholder="Masukkan password"
            className="form-control"
          />
          <span
            className="input-group-text"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <LuEye /> : <LuEyeOff />}
          </span>
        </div>
        <div className="d-flex justify-content-end">
          {formik.errors.password && formik.touched.password && (
            <div className="text-danger pt-1 small">{formik.errors.password}</div>
          )}
        </div>
      </div>

      <button type="submit" disabled={isFetching} className="mt-4 btn btn-orange w-100">
        Masuk
      </button>
    </form>
  );
};

export default LoginForm;
