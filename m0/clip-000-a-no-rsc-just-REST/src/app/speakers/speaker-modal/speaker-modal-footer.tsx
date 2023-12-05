import {useSpeakerModalContext} from "@/components/contexts/speaker-modal-context";
import {useState} from "react";
import {useSpeakerDataContext} from "@/components/contexts/speaker-data-context";

export default function SpeakerModalFooter() {
  const {
    setModalShow,
    modalSpeakerId,
    modalSpeakerFirstName,
    modalSpeakerLastName,
    modalSpeakerCompany,
    modalSpeakerTwitterHandle,
    modalUserBioShort,
    modalSpeakerTimeSpeaking,
  } = useSpeakerModalContext();

  const { updateSpeaker, createSpeaker } = useSpeakerDataContext();

  const [updating, setUpdating] = useState(false);
  return (
    <div className="modal-footer justify-content-center">
      {modalSpeakerId !== 0 && (
        <button
          onClick={() => {
            setUpdating(true);
            console.log("SpeakerModalFooter: modalSpeakerId: ", modalSpeakerId);
            console.log("SpeakerModalFooter: modalSpeakerTimeSpeaking: ", modalSpeakerTimeSpeaking);
            updateSpeaker(
              {
                id: modalSpeakerId,
                firstName: modalSpeakerFirstName,
                lastName: modalSpeakerLastName,
                company: modalSpeakerCompany,
                twitterHandle: modalSpeakerTwitterHandle,
                userBioShort: modalUserBioShort,
                timeSpeaking: modalSpeakerTimeSpeaking,
              },
              () => {
                setUpdating(false); // so that when opening again, it's not disabled and not showing "saving...
                setModalShow(false);
              },
            );
          }}
          className="float-left btn btn-accent"
          disabled={updating}
        >
          {updating ? "Saving..." : "Save"}
        </button>
      )}

      <button
        className="btn btn-danger"
        onClick={() => setModalShow(false)}
        data-dismiss="modal"
      >
        Discard
      </button>

      {modalSpeakerId === 0 && (
        <button
          className="btn btn-accent"
          onClick={() => {
            createSpeaker({
              id: modalSpeakerId,
              firstName: modalSpeakerFirstName,
              lastName: modalSpeakerLastName,
              company: modalSpeakerCompany,
              twitterHandle: modalSpeakerTwitterHandle,
              userBioShort: modalUserBioShort,
              timeSpeaking: modalSpeakerTimeSpeaking,
            }, () => {
              setModalShow(false);
            });
          }}
        >
          Add
        </button>
      )}
    </div>
  );
}
