const { ParseCode } = require("./ParseCode");

class Node {
    constructor(level, text) {
        this.level = level;
        this.text = text;
        this.children = [];
    }
}

export class TreeStructure {
    constructor() {
        this.children = []
    }

    get getTree () {
        return this.children
    }

    AddNode( DataFromJSON ){
        let level = 0
        if(this.children.length === 0){
            const newNode = new Node( ParseCode( DataFromJSON.code + "" , level), DataFromJSON.code + " " + DataFromJSON.name)
            this.children.push(newNode)
        }else {
            var child = this.children.find( (child) => child.level === ParseCode( DataFromJSON.code, level) )

            if( child ){
                this.AddRecursiveNode(child, DataFromJSON, level + 1 )
            }else{
                const newNode = new Node( ParseCode( DataFromJSON.code, level), DataFromJSON.code + " " + DataFromJSON.name)
                this.children.push(newNode)
            }
        }
    }

    AddRecursiveNode ( node, data, level ) {
        if(level === 3){
            const newNode = new Node( ParseCode( data.code + "" , level), data.code + " " + data.name)
            node.children.push(newNode)
        }else {
            let child = node.children.find( (child) => child.level === ParseCode(data.code, level) )

            if(child){
                this.AddRecursiveNode(child, data, level + 1 )
            }else{
                const newNode = new Node( ParseCode( data.code, level), data.code + " " + data.name)
                node.children.push(newNode)
            }
        }
    }
}