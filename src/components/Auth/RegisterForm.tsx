import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/api";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { LuEye, LuEyeOff } from "react-icons/lu";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("email tidak valid").min(1, "email wajib diisi").required("email wajib diisi"),
      first_name: Yup.string().min(1, "nama depan wajib diisi").required("nama depan wajib diisi"),
      last_name: Yup.string().min(1, "nama belakang wajib diisi").required("nama belakang wajib diisi"),
      password: Yup.string().min(8, "password min 8 karakter").required("password wajib diisi"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined], "password tidak sama"),
    }),
    onSubmit: async (values) => {
      try {
        setIsFetching(true)
        await registerUser({
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          password: values.password,
        });
        navigate("/login", { state: { registrationSuccess: true } });
      } catch (error) {
        console.error(error);
      } finally{
        setIsFetching(false)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <MdAlternateEmail />
          </span>
          <input type="email" id="email" {...formik.getFieldProps("email")} placeholder="masukan email anda" className="form-control" />
        </div>
        <div className="d-flex justify-content-end">{formik.errors.email && formik.touched.email && <div className="text-danger pt-1 small">{formik.errors.email}</div>}</div>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <HiOutlineUser />
          </span>
          <input type="text" id="first_name" {...formik.getFieldProps("first_name")} placeholder="nama depan" className="form-control" />
        </div>
        <div className="d-flex justify-content-end">{formik.errors.first_name && formik.touched.first_name && <div className="text-danger pt-1 small">{formik.errors.first_name}</div>}</div>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <HiOutlineUser />
          </span>
          <input type="text" id="last_name" {...formik.getFieldProps("last_name")} placeholder="nama belakang" className="form-control" />
        </div>
        <div className="d-flex justify-content-end">{formik.errors.last_name && formik.touched.last_name && <div className="text-danger pt-1 small">{formik.errors.last_name}</div>}</div>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <MdLockOutline />
          </span>
          <input type={showPassword ? "text" : "password"} id="password" {...formik.getFieldProps("password")} placeholder="buat password" className="form-control" />
          <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
            {showPassword ? <LuEye /> : <LuEyeOff />}
          </span>
        </div>
        <div className="d-flex justify-content-end">{formik.errors.password && formik.touched.password && <div className="text-danger pt-1 small">{formik.errors.password}</div>}</div>
      </div>

      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <MdLockOutline />
          </span>
          <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" {...formik.getFieldProps("confirmPassword")} placeholder="konfirmasi password" className="form-control" />
          <span className="input-group-text" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
            {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
          </span>
        </div>
        <div className="d-flex justify-content-end">{formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="text-danger pt-1 small">{formik.errors.confirmPassword}</div>}</div>
      </div>

      <button type="submit" disabled={isFetching} className="mt-4 btn btn-orange w-100">
        Registrasi
      </button>
    </form>
  );
};

export default RegisterForm;
