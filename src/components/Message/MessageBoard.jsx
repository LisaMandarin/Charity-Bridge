import { Splitter } from "antd";

export function MessageBoard() {

    return (
        <Splitter layout="vertical" className="h-[calc(100vh-6rem-3.5rem)] outline">
            <Splitter.Panel>Message</Splitter.Panel>
            <Splitter.Panel>Send</Splitter.Panel>
        </Splitter>
    )
}