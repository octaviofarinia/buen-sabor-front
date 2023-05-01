const Header=({sectionName})=>{
return(
    <div className="flex w-full h-28 items-center justify-center bg-neutral-900">
        <h1 className="text-center text-2xl font-bold text-zinc-50">{sectionName}</h1>
    </div>
)
}
export default Header;