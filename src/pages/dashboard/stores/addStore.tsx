

import { useState } from "react";

export default function StoreSettings() {
    const [storeName, setStoreName] = useState<string>("");
    const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined);
    const [formData, setFormData] = useState({
        websiteType: "Amazing Panel",
        apiUrl: "",
        apiKey: "",
        mobileWallet: "",
        currencyRate: "",
        rateSync: false,
        affiliateCommission: "Disabled",
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && /\.(png|jpe?g)$/i.test(file.name)) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setLogoPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert("Invalid file type. Only .png, .jpg, and .jpeg are allowed.");
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value, type } = e.target;
      
      
        if (type === "checkbox") {
          const input = e.target as HTMLInputElement; 
          setFormData((prev) => ({
            ...prev,
            [name]: input.checked, 
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
      



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!storeName) {
            alert("Store Name is required!");
        } else {
            console.log("Form Submitted", {
                storeName,
                logo: logoPreview,
                ...formData,
            });
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 mx-auto ">
            <form onSubmit={handleSubmit}>
                {/* Store Logo */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2">Store Logo</label>
                    <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center relative cursor-pointer overflow-hidden">
                        {logoPreview ? (
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-400">Upload Logo</span>
                        )}
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleLogoChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Set the Store logo image. Only *.png, *.jpg, and *.jpeg files are
                        accepted.
                    </p>
                </div>

                {/* Store Name */}
                <div className="mb-6 bg-gray-800 p-6 rounded-lg">
                    <label className="block text-lg font-semibold mb-2">
                        Store Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Store name"
                        className="w-full bg-gray-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!storeName && (
                        <p className="text-sm text-red-500 mt-1">A Store name is required</p>
                    )}
                </div>

                <div className="mb-6 bg-gray-800 p-6 rounded-lg">
                    <label className="block text-lg font-semibold mb-2">
                        API Options <span className="text-red-500">*</span>
                    </label>

                    <div className="mb-4 " >
                        <label className="block mb-1">Website Type</label>
                        <select
                            name="websiteType"
                            value={formData.websiteType}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md bg-gray-700 text-white"
                        >
                            <option value="Amazing Panel">Amazing Panel</option>
                            <option value="Perfect Panel">Perfect Panel</option>
                            <option value="Child Panel">Child Panel</option>
                            <option value="Rental Panel">Rental Panel</option>
                            <option value="Soc Panel">Soc Panel</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>


                    <div className="mb-4">
                        <label className="block mb-1">API URL</label>
                        <input
                            name="apiUrl"
                            value={formData.apiUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            placeholder="https://example.com/API/v2"
                        />
                    </div>

                    {/* API KEY */}
                    <div className="mb-4">
                        <label className="block mb-1">API KEY</label>
                        <input
                            name="apiKey"
                            type="password"
                            value={formData.apiKey}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            placeholder="**********"
                        />
                    </div>

                    {/* Mobile Wallet */}
                    <div className="mb-4">
                        <label className="block mb-1">Store Mobile Wallet</label>
                        <input
                            name="mobileWallet"
                            value={formData.mobileWallet}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            placeholder="01000000000 (use , for multiple)"
                        />
                    </div>

                    {/* Currency Rate */}
                    <div className="mb-4">
                        <label className="block mb-1">Currency Rate</label>
                        <input
                            name="currencyRate"
                            type="number"
                            step="0.01"
                            value={formData.currencyRate}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-gray-700 text-white"
                            placeholder="0.00"
                        />
                        <p className="text-xs text-gray-500 mt-1">If base currency is Egyptian Pound, set value to 1 .</p>
                    </div>
                    <div className="mb-4  items-center">
                        <label className="mr-2 text-white">Rate Sync</label>
                        <div className="flex items-center">
                            <input
                                name="rateSync"
                                type="checkbox"
                                checked={formData.rateSync}
                                onChange={handleInputChange}
                                className="toggle-switch mt-2"
                            />
                            <label className="ml-2 text-gray-400">Using for get live rate</label>
                        </div>
                        <div className="mt-2 text-gray-500">
                            {formData.rateSync ? (
                                <div>
                                  <input type="checkbox" className="mr-2"/>
                                  <span className="text-sm">Sync rate by USDT ≈ 51.25</span><br/> 
                                  <input type="checkbox" className=" mr-2"/>
                                  <span className="text-sm">Sync rate by USD ≈ 48.64</span> 
                                </div>
                             
                            ):(
                                ""
                                
                            )}
                        </div>
                    </div>
                </div>

               
                <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                    <label className="block mb-2 text-white">Affiliate Commission</label>
                    <div className="flex items-center">
                        <input
                            name="affiliateCommission"
                            type="checkbox"
                            checked={formData.affiliateCommission === "Enabled"}
                            onChange={handleInputChange}
                            className="toggle-switch"
                        />

                        <label className="ml-2 text-gray-400 ">
                            {formData.affiliateCommission === "Enabled" ? "Enabled" : "Disabled"}
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
}
