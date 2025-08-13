export default function Tooltip({ country, flagCode }) {
    return (
        <div className="tooltip">
            <img src={`https://flagcdn.com/w320/${flagCode.toLowerCase()}.png`} alt={`${country} flag`} />
            <p>{country}</p>
        </div>
    )
}