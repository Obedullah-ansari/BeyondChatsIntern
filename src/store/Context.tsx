import { createContext, useContext,useState } from "react";


type ContextType = {
    composer :string
    handelComposerChange: (value:string) => void
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [composer, setComposer] = useState<string>("");

    const handelComposerChange = (value: string) => {
        setComposer(value);
    };
    return (
        <Context.Provider value={{ composer,handelComposerChange }}>
            {children}
        </Context.Provider>
    );
}

export const useContextValue = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useContextValue must be used within a ContextProvider");
    }
    return context;
}