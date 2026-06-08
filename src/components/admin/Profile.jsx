
export default function Profile() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return (
        <div className="flex items-center gap-3 w-full overflow-hidden">
            <div>
                <Avatar initials={IntialLetters(IntialLetters(user.fullName))} color={"bg-green-500"} />
            </div>
            <div>
                <h5 className="text-xs font-medium text-ellipsis">{user.fullName}</h5>
                <p className="text-xs text-gray-500">{user.email}</p>
            </div>
        </div>
    )
}


function Avatar({ initials, color }) {
    return (
        <div
            className={`w-10 h-10 rounded-full uppercase flex items-center justify-center text-white text-md ${color}`}
        >
            {initials}
        </div>
    );
}

const IntialLetters = (name) => {
    const initail = name?.split(' ')
    if (initail?.length > 1) {
        return `${initail[0][0]}${initail[1][0]}`;
    } else {
        return `${initail?.[0][0]}`;
    }
}