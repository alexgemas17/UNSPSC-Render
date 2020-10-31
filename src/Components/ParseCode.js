
// Level: 0, 1, 2, 3
export const ParseCode = ( code, level ) => {
    const codestr = code.toString()
    return codestr.slice(level * 2, (level * 2) + 2)
}