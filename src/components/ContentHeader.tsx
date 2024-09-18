import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSync } from "react-icons/fa";
import { fetchUser, fetchBalance } from "../services/api";
import CircularIndeterminate from "../utils/CircularIndeterminate";

const ContentHeader: React.FC = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [balance, setBalance] = useState<string>("Rp. ●●●●●●●");
  const [profileImage, setProfileImage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevState) => !prevState);
  };

  const refreshBalance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetchBalance(token);
        if (response.data.status === 0) {
          setBalance(`Rp. ${response.data.data.balance.toLocaleString()}`);
        } else {
          setError("Gagal mengambil saldo");
        }
      }
    } catch (error) {
      console.error("Kesalahan saat mengambil saldo:", error);
      setError("Kesalahan saat mengambil saldo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userResponse = await fetchUser(token);
          if (userResponse.data.status === 0) {
            setFirstName(userResponse.data.data.first_name);
            setLastName(userResponse.data.data.last_name);
            const imageUrl = userResponse.data.data.profile_image;
            setProfileImage(imageUrl && !imageUrl.includes("null") ? imageUrl : null);
          } else {
            setError("Gagal mengambil data pengguna");
            return;
          }

          await refreshBalance();
        } catch (error) {
          console.error("Kesalahan saat mengambil data pengguna:", error);
          setError("Kesalahan saat mengambil data pengguna");
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="row mb-5">
      <div className="col-md-6">
        <img src={profileImage ? profileImage : ""} className="mb-3 rounded-circle" alt="Profile" style={{ width: "50px", height: "50px" }} />
        <p className="mb-0">Selamat datang,</p>
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
      <div className="col-md-6 position-relative">
        <div>
          <img src="/images/Background Saldo.png" alt="Background Saldo" className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-sm" style={{borderRadius: "15px"}}/>
          <div className="position-relative d-flex flex-column justify-content-start align-items-start gap-2 text-white">
            <p className="mt-2">Saldo Anda</p>
            <h4 className="mb-1">{isBalanceVisible ? balance : "Rp. ●●●●●●●"}</h4>

            <div className="d-flex align-items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  refreshBalance();
                }}
                className="text-decoration-none text-white d-flex align-items-center"
              ></a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleBalanceVisibility();
                }}
                className="text-decoration-none text-white d-flex align-items-center"
              >
                {isBalanceVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}
                <FaEyeSlash className={`ms-2 ${isBalanceVisible ? "d-none" : "d-inline"}`} />
                <FaEye className={`ms-2 ${isBalanceVisible ? "d-inline" : "d-none"}`} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
