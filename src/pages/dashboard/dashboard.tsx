

export default function Dashboard(){
    return(
        <div className="min-h-screen bg-gray-900 text-white p-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            Welcome <span className="text-gray-900">Kareem Elbhrawy</span>
          </h1>
          <p className="text-gray-200 mb-6">Here is your last Statistic</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <span className="text-purple-400 text-4xl font-bold">94 EGP</span>
              <p className="text-gray-400 mt-2">Total Amount</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <span className="text-blue-400 text-4xl font-bold">3</span>
              <p className="text-gray-400 mt-2">Total Transactions</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <span className="text-yellow-400 text-4xl font-bold">1</span>
              <p className="text-gray-400 mt-2">Total Stores</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <span className="text-green-400 text-4xl font-bold">1</span>
              <p className="text-gray-400 mt-2">Active Stores</p>
            </div>
          </div>
        </div>

     
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Last 7 Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400">
                  <th className="p-2">ID</th>
                  <th className="p-2">Store</th>
                  <th className="p-2">From</th>
                  <th className="p-2">Provider</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">State</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="bg-gray-700">
                  <td className="p-2">319</td>
                  <td className="p-2">-</td>
                  <td className="p-2">01069664131</td>
                  <td className="p-2">VF-Cash</td>
                  <td className="p-2 font-bold">74</td>
                  <td className="p-2">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                      Pending
                    </span>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="bg-gray-800">
                  <td className="p-2">312</td>
                  <td className="p-2">-</td>
                  <td className="p-2">01016772118</td>
                  <td className="p-2">VF-Cash</td>
                  <td className="p-2 font-bold">10</td>
                  <td className="p-2">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                      Pending
                    </span>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="bg-gray-700">
                  <td className="p-2">297</td>
                  <td className="p-2">Manual</td>
                  <td className="p-2">01010586461</td>
                  <td className="p-2">VF-Cash</td>
                  <td className="p-2 font-bold">10</td>
                  <td className="p-2">
                    <span className="bg-green-500 text-black px-2 py-1 rounded">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    )

}