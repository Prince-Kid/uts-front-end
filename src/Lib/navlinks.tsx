import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const userData:any = useAuthUser()
export const Navlinks = [
    {
        id: '001',
        label: "dashboard",
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.34" d="M10 15V12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.39076 2.34992L2.61575 6.97491C1.96575 7.49158 1.54908 8.58321 1.69075 9.39987L2.79908 16.0332C2.99908 17.2165 4.13241 18.1749 5.33241 18.1749H14.6658C15.8574 18.1749 16.9991 17.2082 17.1991 16.0332L18.3074 9.39987C18.4408 8.58321 18.0241 7.49158 17.3824 6.97491L11.6074 2.35825C10.7158 1.64158 9.27409 1.64158 8.39076 2.34992Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        location: "/admin"

    },
    {
        id: '002',
        label: userData.role === "admin" ? "Users" : "My Products",
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.63411 9.05829C7.55078 9.04996 7.45078 9.04996 7.35911 9.05829C5.37578 8.99163 3.80078 7.36663 3.80078 5.36663C3.80078 3.32496 5.45078 1.66663 7.50078 1.66663C9.54241 1.66663 11.2007 3.32496 11.2007 5.36663C11.1924 7.36663 9.61741 8.99163 7.63411 9.05829Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        <path opacity="0.4" d="M13.6747 3.33337C15.2914 3.33337 16.5914 4.64171 16.5914 6.25004C16.5914 7.82504 15.3414 9.10837 13.7831 9.16671C13.7164 9.15837 13.6414 9.15837 13.5664 9.16671" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.46758 12.1334C1.45091 13.4834 1.45091 15.6834 3.46758 17.025C5.75924 18.5584 9.51758 18.5584 11.8092 17.025C13.8259 15.675 13.8259 13.475 11.8092 12.1334C9.52591 10.6084 5.76758 10.6084 3.46758 12.1334Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        <path opacity="0.4" d="M15.2832 16.6667C15.8832 16.5417 16.4499 16.3 16.9165 15.9417C18.2165 14.9667 18.2165 13.3584 16.9165 12.3834C16.4582 12.0334 15.8999 11.8 15.3082 11.6667" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ,
        location: "/admin/users"

    },
    {
        id: '003',
        label: "Sellers",
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.34" d="M10 15V12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.39076 2.34992L2.61575 6.97491C1.96575 7.49158 1.54908 8.58321 1.69075 9.39987L2.79908 16.0332C2.99908 17.2165 4.13241 18.1749 5.33241 18.1749H14.6658C15.8574 18.1749 16.9991 17.2082 17.1991 16.0332L18.3074 9.39987C18.4408 8.58321 18.0241 7.49158 17.3824 6.97491L11.6074 2.35825C10.7158 1.64158 9.27409 1.64158 8.39076 2.34992Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        location: "/admin/sellers"

    },
    {
        id: '004',
        label: "Analytics",
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.34" d="M10 15V12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.39076 2.34992L2.61575 6.97491C1.96575 7.49158 1.54908 8.58321 1.69075 9.39987L2.79908 16.0332C2.99908 17.2165 4.13241 18.1749 5.33241 18.1749H14.6658C15.8574 18.1749 16.9991 17.2082 17.1991 16.0332L18.3074 9.39987C18.4408 8.58321 18.0241 7.49158 17.3824 6.97491L11.6074 2.35825C10.7158 1.64158 9.27409 1.64158 8.39076 2.34992Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        location: "/admin/analytics"

    },
    {
        id: '005',
        label: "dashboard",
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.34" d="M10 15V12.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.39076 2.34992L2.61575 6.97491C1.96575 7.49158 1.54908 8.58321 1.69075 9.39987L2.79908 16.0332C2.99908 17.2165 4.13241 18.1749 5.33241 18.1749H14.6658C15.8574 18.1749 16.9991 17.2082 17.1991 16.0332L18.3074 9.39987C18.4408 8.58321 18.0241 7.49158 17.3824 6.97491L11.6074 2.35825C10.7158 1.64158 9.27409 1.64158 8.39076 2.34992Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        location: "/admin"

    },
]