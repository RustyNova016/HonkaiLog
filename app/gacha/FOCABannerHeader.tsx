import {GachaBanner} from "@/utils/Objects/Gacha/GachaBanner";
import {SectionTitle} from "@/components/UI/Theme/SectionTitle";
import {Form} from "react-bootstrap";
import {z} from "zod";

interface FOCABannerHeaderProps {
    gachaBanner: GachaBanner;
    setNbItemGotten: (setter: number) => void;
    setNbPulls: (setter: number) => void;
    value: number;
    value1: number;
}

export function FOCABannerHeader(props: FOCABannerHeaderProps) {
    return <div className={"flex flex-row justify-content-between align-content-center"}>
        <SectionTitle title={props.gachaBanner.name}/>

        <div className={"flex flex-row align-items-center text-center"}>
            <>
                <>Nb of pulls made since last UP equipment in current session:</>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label label="Guarranty" className="mb-3"></Form.Label>
                        <Form.Control type="number"
                                      placeholder="name@example.com"
                                      value={props.value}
                                      onChange={event => {
                                          let num = z.number().parse(parseInt(event.target.value));
                                          if (num < 0) {
                                              props.setNbPulls(0);
                                              return
                                          }
                                          if (num > 49) {
                                              props.setNbPulls(49);
                                              return
                                          }
                                          props.setNbPulls(num)
                                      }
                                      }/>
                    </Form.Group>
                </Form>
                <>Number of UP equipment gotten:</>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label label="Completion" className="mb-3"></Form.Label>
                        <Form.Control type="number"
                                      placeholder="name@example.com"
                                      value={props.value1}
                                      onChange={event => {
                                          let num = z.number().parse(parseInt(event.target.value));
                                          if (num < 0) {
                                              props.setNbItemGotten(0);
                                              return
                                          }
                                          if (num > 3) {
                                              props.setNbItemGotten(3);
                                              return
                                          }
                                          props.setNbItemGotten(num)
                                      }
                                      }/>
                    </Form.Group>
                </Form>
            </>
        </div>
    </div>;
}