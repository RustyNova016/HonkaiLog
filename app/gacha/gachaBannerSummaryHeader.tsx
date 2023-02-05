import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Form} from "react-bootstrap";
import {z} from "zod";

export function GachaBannerSummaryHeader(props: {
    gachaBanner: GachaBanner,
    value: number,
    setNbPulls: (event: any) => void
}) {
    return <div className={"flex flex-row justify-content-between align-content-center"}>
        <SectionTitle title={props.gachaBanner.name}/>

        <div className={"flex flex-row align-items-center text-center"}>
            <>
                <>Pulls left before pity:</>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label label="Guarranty" className="mb-3"></Form.Label>
                        <Form.Control type="number"
                                      placeholder="name@example.com"
                                      value={props.value}
                                      onChange={event => {
                                          let num = z.number().parse(parseInt(event.target.value));
                                          if (num < 1) {
                                              props.setNbPulls(1);
                                              return
                                          }
                                          if (num > 100) {
                                              props.setNbPulls(100);
                                              return
                                          }
                                          props.setNbPulls(num)
                                      }
                                      }/>
                    </Form.Group>
                </Form>
            </>
        </div>
    </div>;
}