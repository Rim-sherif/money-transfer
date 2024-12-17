export default function Manualcheck() {
    return (
        <div className="bg-gray-800 text-white p-8 rounded-md  mx-auto">
            <h2 className="text-2xl font-bold mb-4">Check Transction</h2>

            <form className="space-y-6">
                

                <div>
                    <label htmlFor="sender-number" className="block text-sm font-medium">Sender Number</label>
                    <input
                        type="tel"
                        id="sender-number"
                        placeholder="Sender's Mobile Number"
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
                        required
                    />
                    <p className="text-sm text-red-700 mt-1">Sender's number is required</p>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Amount"
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
                        required
                    />
                    <p className="text-sm text-red-700 mt-1">Amount is required</p>
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
                        required
                    />
                    <p className="text-sm text-red-700 mt-1">Username is required</p>
                </div>
                <div>
                    <label htmlFor="store" className="block text-sm font-medium">Store</label>
                    <select
                        id="store"
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 outline-none"
                        required
                    >
                        <option value="">Select Store</option>
                        <option value="store1">Store 1</option>
                        <option value="store2">Store 2</option>
                        <option value="store3">Store 3</option>
                    </select>
                    <p className="text-sm text-red-700 mt-1">Store selection is required</p>
                </div>
                <button
                    type="submit"
                    className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                    Check
                </button>
            </form>
        </div>
    );
}