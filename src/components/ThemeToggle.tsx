import { useEffect, useState } from "react"
import Icon from "./Icon"

type Theme = "light" | "dark"

const STORAGE_KEY = "minishop-theme"

const theme_names: Record<Theme, string> = {
    light: "minishop",
    dark: "minishop-dark"
}

function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light")

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme_names[theme])
        localStorage.setItem(STORAGE_KEY, theme)
        return () => document.documentElement.removeAttribute("data-theme")
    }, [theme])

    const next = theme === "light" ? "Dark Mode" : "Light Mode"

    return (
        <button
            type="button"
            onClick={() => setTheme(current => current === "light" ? "dark" : "light")}
            aria-label={next}
            className="btn btn-ghost btn-sm"
        >
            <Icon name={theme === "light" ? "moon" : "sun"} className="size-5" />
            <span className="hidden sm:inline">{next}</span>
        </button>
    )
}

export default ThemeToggle
