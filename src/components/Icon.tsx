const icons = {
    home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
    box: <><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    cart: <><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.5 12h11l2-8H6.2" /></>,
    avatar: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3.5" fill="white" /><path d="M5.5 18.5c1.5-2.5 4-3.5 6.5-3.5s5 1 6.5 3.5" fill="white" /></>,
    baht: <path d="M8 5h5a3 3 0 0 1 0 6H8zM8 11h6a3.5 3.5 0 0 1 0 7H8zM8 5v13M12 3v2M12 18v2" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    id_card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10h4M7 14h10" /></>,
    pen: <path d="m15 4 5 5L9 20H4v-5z" />,
    star: <path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    back: <path d="m15 6-6 6 6 6" />,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    tag: <><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
    moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
}

export type IconName = keyof typeof icons

type IconProps = {
    name: IconName
    className?: string
    filled?: boolean
}

function Icon({ name, className = "size-5", filled = false }: IconProps) {
    if (filled) {
        return <svg className={className} viewBox="0 0 24 24" fill="currentColor">{icons[name]}</svg>
    }
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icons[name]}
        </svg>
    )
}

export default Icon
