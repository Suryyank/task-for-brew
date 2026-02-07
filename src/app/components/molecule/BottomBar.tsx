import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/db/firebaseContext";
import { useModalContext } from "@/context/ModalStateContext";
import {
  DiamondPlus,
  LayoutDashboard,
  Archive,
  Sparkle,
  LogOut,
} from "lucide-react";

const BottomBar = () => {
  const router = useRouter();
  const modalContext = useModalContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  }

  function handleClick() {
    modalContext.setModalState(true);
    console.log(modalContext.modalState);
  }
  return (
    <>
      {!modalContext.modalState && (
        <nav className="sticky bottom-6 left-12 right-12 z-50 flex items-center justify-center max-sm:w-fit">
          <div className="flex items-center justify-center sm:gap-15 gap-8 w-fit rounded-full bg-white outline shadow-md py-3 px-6 max-sm:mx-4">
            <LayoutDashboard
              size={35}
              className="hover:rotate-90 hover:text-amber-400 duration-150"
            />
            <Sparkle
              size={35}
              className="hover:rotate-90 hover:text-pink-500 duration-150"
            />
            <button onClick={handleClick}>
              <DiamondPlus
                size={35}
                className="hover:scale-110 hover:text-green-500 duration-150"
              />
            </button>
            <Archive
              size={35}
              className="hover:scale-110 hover:text-amber-600 duration-150"
            />
            <button onClick={handleLogout}>
              <LogOut
                size={35}
                className="hover:scale-110 hover:text-red-500 duration-150"
              />
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default BottomBar;
