using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraPan : MonoBehaviour
{
    public Camera cam;
    private Vector3 origin;
    private Vector3 offset;
    private Vector3 defaultPosition;
    private float defaultSize;


    private bool dragging = false;
    // Start is called before the first frame update
    void Awake()
    {
        cam = gameObject.GetComponent<Camera>();
        defaultPosition = cam.transform.position;
    }

    // Update is called once per frame
    void LateUpdate()
    {
        if (Input.GetMouseButton(0)) {
            offset = cam.ScreenToWorldPoint(Input.mousePosition) - cam.transform.position;
            if (!dragging) {
                dragging = true;
                origin = cam.ScreenToWorldPoint(Input.mousePosition);
            }
        } else {
            dragging = false;
        }


        if (dragging) {
            cam.transform.position = origin - offset;
        }

        if (Input.GetMouseButton(1)) {
            cam.transform.position = defaultPosition;
            cam.orthographicSize = defaultSize;
        }

        cam.orthographicSize -= Input.mouseScrollDelta.y;
    }
}
