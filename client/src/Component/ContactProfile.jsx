import React from 'react'

function ContactProfile({
  data=null,
  handleContactClick
}) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors" onClick={()=>handleContactClick(data)}>
      <img
        src={data?.avatar}
        alt="User"
        className="rounded-full w-10 h-10 object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{data?.name}</h4>
        <p className="text-gray-600 text-sm">@{data?.username}</p>
      </div>
      <span className="text-xs text-gray-400">2m ago</span>
    </div> 
  )
}

export default ContactProfile