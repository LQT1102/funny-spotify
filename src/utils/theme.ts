import STORAGE_KEYS from "@/src/commons/storageKeys";

export const changeCurrentTheme = (name: string) => {
    const el = document.getElementById("root-html");
    if (el) {
      el.setAttribute("data-theme", name);
      localStorage.setItem(STORAGE_KEYS.THEME, name);
    }
};

export const getCurrentTheme = () => {
   try {
    if(window && document){
        const currentTheme = document.getElementById("root-html")?.getAttribute("data-theme");
        return currentTheme;
    }

   } catch (error) {
    return "";
   }
  };