import { ReactElement } from "react";

type CateringProps = {
    eventId: string | number | undefined;
  };

const CateringManager = (props : CateringProps) : ReactElement => {
    const eventId = props.eventId 
    console.log(eventId)

    

    return (
        <>
        <h1>Catering</h1>
        </>
    )
}

export default CateringManager