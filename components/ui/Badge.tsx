interface BadgeProps {
    label: string
    color?: 'blue' | 'green' | 'red' | 'purple' | 'gray'
}

const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
}

export default function Badge({ label, color = 'blue'}: BadgeProps) {
    return (
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colorMap[color]}`}>
            {label}
        </span>
    )
}