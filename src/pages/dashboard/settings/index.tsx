
export default function settings() {
  return (
    <>
    <div className="bg-gray-800 text-white p-8 rounded-md  mx-auto">
  <h2 className="text-2xl font-bold mb-4">General</h2>

  <form className="space-y-6">
    {/* First Name */}
    <div>
      <label htmlFor="first-name" className="block text-sm font-medium">First Name</label>
      <input 
        type="text" 
        id="first-name" 
        placeholder="Kareem" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">A first name is required</p>
    </div>

    {/* Last Name */}
    <div>
      <label htmlFor="last-name" className="block text-sm font-medium">Last Name</label>
      <input 
        type="text" 
        id="last-name" 
        placeholder="Elbhrawy" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">A last name is required</p>
    </div>

    {/* Mobile Number */}
    <div>
      <label htmlFor="mobile-number" className="block text-sm font-medium">Mobile Number</label>
      <input 
        type="tel" 
        id="mobile-number" 
        placeholder="01016772118" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">A phone number is required</p>
    </div>

    {/* Email */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium">Email</label>
      <input 
        type="email" 
        id="email" 
        placeholder="kareemelb7rawy@gmail.com" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">Email is required</p>
    </div>

    {/* App Token */}
    <div>
      <label htmlFor="app-token" className="block text-sm font-medium">Your App Token</label>
      <input 
        type="text" 
        id="app-token" 
        value="oat_OA.bHVTMnRkRkI1MmQ5bldvQklvRDIxY0Q4NGVIYnZjeHh3d0JIUjVNVDI2NDUwMjMx" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        readOnly
      />
    </div>

    <h2 className="text-2xl font-bold mt-6 mb-4">Change Password</h2>

    {/* Current Password */}
    <div>
      <label htmlFor="current-password" className="block text-sm font-medium">Current Password</label>
      <input 
        type="password" 
        id="current-password" 
        placeholder="Current Password" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">Current Password is required</p>
    </div>

    {/* New Password */}
    <div>
      <label htmlFor="new-password" className="block text-sm font-medium">New Password</label>
      <input 
        type="password" 
        id="new-password" 
        placeholder="New Password" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">New Password is required</p>
    </div>

    {/* Confirm Password */}
    <div>
      <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
      <input 
        type="password" 
        id="confirm-password" 
        placeholder="Confirm New Password" 
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
        required
      />
      <p className="text-sm text-red-700 mt-1">Confirm Password is required</p>
    </div>

    <button 
      type="submit" 
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      Save Changes
    </button>
  </form>
</div>

    </>
  );
}