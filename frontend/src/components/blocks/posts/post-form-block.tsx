export default function PostFormBlock({children}: {children: React.ReactNode}) {
    return (
        <div className="p-3 bg-sidebar rounded-[.5rem] space-y-2">
            {children}
        </div>
    )
}