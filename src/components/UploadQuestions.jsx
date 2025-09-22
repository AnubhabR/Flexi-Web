import React from 'react';
import * as Icon from "lucide-react";

/**
 * UploadQuestions Component: An area to upload a question file.
 */
const UploadQuestions = () => {
    return (
        <div className="w-full max-w-2xl p-8 bg-amber-50 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-neutral-800 mb-6">Upload Questions File</h2>
            <div className="flex justify-center items-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <Icon.UploadCloud size={48} className="text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">CSV, XLS, or DOCX (MAX. 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>
             <button type="button" className="w-full mt-6 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                Submit File
            </button>
        </div>
    );
};

export default UploadQuestions;
