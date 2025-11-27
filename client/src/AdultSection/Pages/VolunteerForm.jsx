import React from 'react'
import {Link} from 'react-router-dom'

const VolunteerForm = () => {
    return (
        <div className="bg-gray-100" style={{ backgroundColor: "#0d87f431" }}>
            <div className="mx-auto px-20 sm:px-16 lg:px-18">
                <br />
                <br />
                <h1 className="font-bold text-gray-900 text-4xl" style={{ textAlign: "center" }}>Registration details</h1>
                <p className="mt-1 text-sm leading-6 text-gray-600" style={{ textAlign: "center", marginTop: "20px" }}>This information will be displayed publicly so be careful what you share.</p>
                <form>
                    <div className="space-y-12 lg:grid lg:grid-cols-1 lg:gap-x-10 lg:space-y-0">
                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">

                                {/* <UsernameField /> */}
                                <div className="sm:col-span-4">
            <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                    <input type="text" name="username" id="username" autocomplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                </div>
            </div>
        </div>

                                {/* ABOUT FIELD */}
                                <div className="col-span-full">
                                            <label for="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                            <div className="mt-2">
                                                <textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                        </div>
                                <div className="col-span-full">
            <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="file-upload" className="relative cursor-pointer rounded-md  font-semibold text-[#0D79F4] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-gray-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
                            </div>
                        </div>

                        {/* <PersonalInformationCard /> */}
                        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="mt-7 text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                    <div className="mt-2">
                        <input type="text" name="first-name" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label for="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                    <div className="mt-2">
                        <input type="text" name="last-name" id="last-name" autocomplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label for="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                    <div className="mt-2">
                        <select id="country" name="country" autocomplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-full">
                    <label for="street-address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                    <div className="mt-2">
                        <input type="text" name="street-address" id="street-address" autocomplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                    <label for="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                    <div className="mt-2">
                        <input type="text" name="city" id="city" autocomplete="address-level2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label for="region" className="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                    <div className="mt-2">
                        <input type="text" name="region" id="region" autocomplete="address-level1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label for="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                    <div className="mt-2">
                        <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </div>
        </div>

                        {/* <NotificationsSettingsCard /> */}

                        <div className="flex items-center justify-center gap-x-6" style={{ marginTop: "34px", marginBottom: "70px" }}>
                            <Link to="Volunteer" type="button" className="text-sm font-semibold leading-6 text-gray-900  hover:text-[#0D79F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ width: "20%", backgroundColor: "white", border: "1px solid white", borderRadius: "5px", padding: "7px" }}>Cancel</Link>
                            <Link to="Volunteer" type="submit" className="max-w-xl rounded-md bg-[#0D79F4] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-100 hover:text-[#0D79F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ width: "20%" }}>Submit</Link>

                        </div>
                    </div>


                </form>

            </div>
        </div>


    )
}

export default VolunteerForm