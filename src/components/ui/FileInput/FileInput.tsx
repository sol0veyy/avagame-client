interface FileInputProps {
    selectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const FileInput = ({selectFile, className}: FileInputProps) => {
    return (
        <input
            onChange={selectFile}
            type="file"
            className={`${className} block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:text-neutral-500
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400`}
        />
    );
};

export default FileInput;
