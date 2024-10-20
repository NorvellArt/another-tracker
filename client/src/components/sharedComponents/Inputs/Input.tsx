import styled from 'styled-components';

interface Props {
    placeholder: string;
    value: string;
    type: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholder, value, type, onChange }) => {
    return (
        <>
            <StyledInput
                placeholder={placeholder}
                value={value}
                type={type}
                onChange={onChange}
            />
        </>
    );
};

const StyledInput = styled.input`
    border: none;
    border-bottom: 2px solid #ff7948a6;
    font-size: 16px;
    background: none;
    width: 100%;

    &:focus {
        outline: none;
        border-bottom-color: #ff7a48;
    }
`;

export default Input;
