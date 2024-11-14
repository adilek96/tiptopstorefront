import * as React from "react";

export default function DeliveryTruck(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 30 20"
    >
      <defs>
        <clipPath id="clip-0"></clipPath>
        <clipPath id="clip-1">
          <path
            d="M2150.7 382h731.5c19.1 0 34.6 15.398 34.6 34.5v34.398H2897c-.2 0-.602-.097-.8-.097-.2 0-.598.097-.802.097h-284c-.199 0-.597-.097-.796-.097-.204 0-.602.097-.801.097h-186.602c-.199 0-.597-.097-.8-.097-.2 0-.598.097-.797.097H2137.8c-.2 0-.602-.097-.801-.097s-.602.097-.8.097h-19.9V416.5c-.198-19 15.302-34.5 34.4-34.5m420 148.398v108.903l-28.7-16c-15.8-8.5-35.398-8.5-51.7.199l-28.3 15.7V530.3Zm285.6 481.403h-679.698V530.398H2382.5V707c0 14.102 7.5 27.2 19.602 34.2 6.199 3.6 13.199 5.5 20.199 5.5 6.699 0 13.3-1.7 19.3-5l74.899-41.598 74.8 41.597c12.302 6.801 27.302 6.7 39.5-.5C2642.899 734 2650.399 721 2650.399 707V530.398H2856.5Zm-779.902-481.403h20.704v497.903c0 34.8 28.296 63.097 63.097 63.097h712.5c34.801 0 63.102-28.296 63.102-63.097V530.5h20.597c10.5 0 20.602-4.2 28.102-11.7s11.7-17.6 11.7-28.1v-74.2c0-62.898-51.2-114.102-114.098-114.102h-731.5c-62.903 0-114.102 51.204-114.102 114v74.204c.102 22 17.898 39.796 39.898 39.796m1298.5 1254.102h-239.597c4-22.7 6.199-46 6.199-69.7 0-23.902-2.2-47.198-6.2-69.8h258.2v121.102c0 10.097-8.3 18.398-18.602 18.398m-634 251.102c-177 0-320.898-144-320.898-320.903 0-177 144-320.898 320.898-320.898 177 0 321 144 321 320.898 0 177-143.898 320.903-321 320.903M1126.301 1784.5c4-22.7 6.199-46 6.199-69.7 0-23.902-2.2-47.198-6.2-69.8h1220.302c-4 22.7-6.204 46.102-6.204 69.8 0 23.802 2.204 47.098 6.204 69.7Zm-394.2 251.102c-177 0-320.902-144-320.902-320.903 0-177 144-320.898 320.903-320.898C909 1393.8 1053 1537.8 1053 1714.699c0 177-144 320.903-320.898 320.903M95.2 1784.5c-8.597 0-15.597-7-15.597-15.602v-124.097H337.8c-4 22.699-6.2 46.097-6.2 69.8 0 23.7 2.2 47.098 6.2 69.7Zm-15.597-463.898h119.296c20.704 0 37.5 16.796 37.5 37.5 0 20.699-16.796 37.5-37.5 37.5H79.602Zm88.097-299.903 257.403-121.898c35.296-16.7 63.398-45.5 79.296-81.102l244.704-548.097c15.597-34.903 50.296-57.5 88.5-57.5L1559.8 212v1353.3H1103.5c-59.398-147-203.398-251.1-371.5-251.1s-312.102 104-371.5 251.1H79.602v-90.1h119.296c64.5 0 117.102-52.5 117.102-117.098 0-64.5-52.5-117.102-117.102-117.102H79.5v-81.2c.102-59 34.8-113.8 88.2-139.1M1658 79.602h1716.898c10.204 0 18.602 8.296 18.602 18.597v1467.2h-281c-59.398-147-203.5-251.098-371.602-251.098-168 0-312.097 104.097-371.5 251.097h-730.097V98.102c.097-10.204 8.398-18.5 18.699-18.5M3374.898 0H1658c-54.102 0-98.102 44-98.102 98.102v34.5l-722.199.097c-69.5 0-132.699 41-161.097 104.5L431.8 785.301c-8.102 18.3-22.602 33-40.7 41.597L133.7 948.801C52.5 987.3 0 1070.199 0 1159.898v609C0 1821.301 42.7 1864 95.2 1864h265.402c59.296 147 203.398 251.2 371.5 251.2 168.097 0 312.199-104.098 371.5-251.2H2369.5c59.398 147 203.5 251.2 371.5 251.2 168.102 0 312.2-104.098 371.602-251.2H3375c54.102 0 98.102-44 98.102-98.102V98.102C3473 44 3429 0 3374.898 0M1392.102 1085.2c0 22-17.801 39.8-39.801 39.8H1181.5c-22 0-39.8-17.8-39.8-39.8s17.8-39.802 39.8-39.802h170.8c22 0 39.802 17.801 39.802 39.801M2740.898 1823c-59.699 0-108.199-48.602-108.199-108.3 0-59.7 48.602-108.302 108.2-108.302 59.703 0 108.3 48.602 108.3 108.301S2800.7 1823 2740.9 1823m0-296.102c-103.5 0-187.699 84.204-187.699 187.801 0 103.602 84.2 187.801 187.801 187.801 103.5 0 187.8-84.2 187.8-187.8 0-103.5-84.3-187.802-187.902-187.802M732.102 1823c-59.704 0-108.301-48.602-108.301-108.3 0-59.7 48.597-108.302 108.3-108.302 59.7 0 108.2 48.602 108.2 108.301S791.8 1823 732.1 1823m0-296.102c-103.5 0-187.801 84.204-187.801 187.801 0 103.602 84.3 187.801 187.8 187.801s187.7-84.2 187.7-187.8c0-103.5-84.2-187.802-187.7-187.802m182.5-1140.796H1342.5v417.5H728.102ZM666.898 883.3H1382.2c22 0 39.801-17.801 39.801-39.801V346.398c0-22-17.8-39.796-39.8-39.796H888.7c-15.7 0-29.9 9.199-36.302 23.5L630.5 827.3c-5.5 12.3-4.398 26.5 2.898 37.898 7.403 11.2 20 18.102 33.5 18.102"
            clipRule="evenodd"
          ></path>
        </clipPath>
        <linearGradient
          id="linear-pattern-0"
          x1="-0.205"
          x2="1.07"
          y1="0"
          y2="0"
          gradientTransform="rotate(45 368.699 1050.09)scale(3098.7)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#D6272D"></stop>
          <stop offset="0.125" stopColor="#D6272D"></stop>
          <stop offset="0.156" stopColor="#D6272D"></stop>
          <stop offset="0.164" stopColor="#D6272D"></stop>
          <stop offset="0.168" stopColor="#D6282C"></stop>
          <stop offset="0.172" stopColor="#D6282C"></stop>
          <stop offset="0.176" stopColor="#D6282C"></stop>
          <stop offset="0.18" stopColor="#D6292B"></stop>
          <stop offset="0.184" stopColor="#D6292B"></stop>
          <stop offset="0.188" stopColor="#D62A2B"></stop>
          <stop offset="0.191" stopColor="#D62A2B"></stop>
          <stop offset="0.195" stopColor="#D72B2A"></stop>
          <stop offset="0.199" stopColor="#D72B2A"></stop>
          <stop offset="0.203" stopColor="#D72C2A"></stop>
          <stop offset="0.207" stopColor="#D72C29"></stop>
          <stop offset="0.211" stopColor="#D72C29"></stop>
          <stop offset="0.215" stopColor="#D82C29"></stop>
          <stop offset="0.219" stopColor="#D82D28"></stop>
          <stop offset="0.227" stopColor="#D82D28"></stop>
          <stop offset="0.23" stopColor="#D82E28"></stop>
          <stop offset="0.234" stopColor="#D82F27"></stop>
          <stop offset="0.238" stopColor="#D82F27"></stop>
          <stop offset="0.242" stopColor="#D92F27"></stop>
          <stop offset="0.246" stopColor="#D92F27"></stop>
          <stop offset="0.25" stopColor="#D93026"></stop>
          <stop offset="0.254" stopColor="#D93026"></stop>
          <stop offset="0.258" stopColor="#D93126"></stop>
          <stop offset="0.266" stopColor="#D93126"></stop>
          <stop offset="0.273" stopColor="#DA3225"></stop>
          <stop offset="0.277" stopColor="#DB3325"></stop>
          <stop offset="0.281" stopColor="#DB3325"></stop>
          <stop offset="0.289" stopColor="#DB3425"></stop>
          <stop offset="0.297" stopColor="#DC3424"></stop>
          <stop offset="0.305" stopColor="#DC3524"></stop>
          <stop offset="0.313" stopColor="#DC3524"></stop>
          <stop offset="0.32" stopColor="#DD3624"></stop>
          <stop offset="0.324" stopColor="#DE3723"></stop>
          <stop offset="0.328" stopColor="#DE3723"></stop>
          <stop offset="0.332" stopColor="#DE3823"></stop>
          <stop offset="0.336" stopColor="#DF3823"></stop>
          <stop offset="0.34" stopColor="#DF3822"></stop>
          <stop offset="0.344" stopColor="#DF3922"></stop>
          <stop offset="0.352" stopColor="#DF3922"></stop>
          <stop offset="0.355" stopColor="#DF3A21"></stop>
          <stop offset="0.359" stopColor="#E03B21"></stop>
          <stop offset="0.367" stopColor="#E03B21"></stop>
          <stop offset="0.375" stopColor="#E03B21"></stop>
          <stop offset="0.379" stopColor="#E03C21"></stop>
          <stop offset="0.383" stopColor="#E03D20"></stop>
          <stop offset="0.387" stopColor="#E03D20"></stop>
          <stop offset="0.391" stopColor="#E13E20"></stop>
          <stop offset="0.395" stopColor="#E13E20"></stop>
          <stop offset="0.398" stopColor="#E13F20"></stop>
          <stop offset="0.406" stopColor="#E13F20"></stop>
          <stop offset="0.414" stopColor="#E14020"></stop>
          <stop offset="0.418" stopColor="#E14120"></stop>
          <stop offset="0.422" stopColor="#E24120"></stop>
          <stop offset="0.426" stopColor="#E24220"></stop>
          <stop offset="0.43" stopColor="#E24220"></stop>
          <stop offset="0.434" stopColor="#E2431F"></stop>
          <stop offset="0.438" stopColor="#E3431F"></stop>
          <stop offset="0.445" stopColor="#E3431F"></stop>
          <stop offset="0.449" stopColor="#E3441F"></stop>
          <stop offset="0.453" stopColor="#E3441F"></stop>
          <stop offset="0.457" stopColor="#E3451F"></stop>
          <stop offset="0.461" stopColor="#E3451F"></stop>
          <stop offset="0.465" stopColor="#E4461F"></stop>
          <stop offset="0.469" stopColor="#E4461F"></stop>
          <stop offset="0.477" stopColor="#E4471F"></stop>
          <stop offset="0.484" stopColor="#E4471F"></stop>
          <stop offset="0.488" stopColor="#E5481E"></stop>
          <stop offset="0.492" stopColor="#E5491E"></stop>
          <stop offset="0.5" stopColor="#E5491E"></stop>
          <stop offset="0.508" stopColor="#E64A1E"></stop>
          <stop offset="0.512" stopColor="#E64A1E"></stop>
          <stop offset="0.516" stopColor="#E64B1E"></stop>
          <stop offset="0.52" stopColor="#E64B1E"></stop>
          <stop offset="0.523" stopColor="#E64C1E"></stop>
          <stop offset="0.527" stopColor="#E74C1D"></stop>
          <stop offset="0.531" stopColor="#E74C1D"></stop>
          <stop offset="0.535" stopColor="#E84D1D"></stop>
          <stop offset="0.539" stopColor="#E84D1D"></stop>
          <stop offset="0.543" stopColor="#E84E1D"></stop>
          <stop offset="0.547" stopColor="#E94E1D"></stop>
          <stop offset="0.555" stopColor="#E94E1D"></stop>
          <stop offset="0.563" stopColor="#E94F1D"></stop>
          <stop offset="0.57" stopColor="#EA501D"></stop>
          <stop offset="0.574" stopColor="#EA501C"></stop>
          <stop offset="0.578" stopColor="#EA511C"></stop>
          <stop offset="0.582" stopColor="#EA511C"></stop>
          <stop offset="0.586" stopColor="#EB521C"></stop>
          <stop offset="0.59" stopColor="#EB531C"></stop>
          <stop offset="0.594" stopColor="#EB531C"></stop>
          <stop offset="0.598" stopColor="#EB541C"></stop>
          <stop offset="0.602" stopColor="#EB541C"></stop>
          <stop offset="0.605" stopColor="#EB551C"></stop>
          <stop offset="0.609" stopColor="#EC551C"></stop>
          <stop offset="0.613" stopColor="#EC561B"></stop>
          <stop offset="0.617" stopColor="#EC561B"></stop>
          <stop offset="0.621" stopColor="#EC571B"></stop>
          <stop offset="0.625" stopColor="#EC571B"></stop>
          <stop offset="0.629" stopColor="#EC581B"></stop>
          <stop offset="0.633" stopColor="#EC581B"></stop>
          <stop offset="0.637" stopColor="#ED591B"></stop>
          <stop offset="0.641" stopColor="#ED591B"></stop>
          <stop offset="0.645" stopColor="#ED5A1B"></stop>
          <stop offset="0.648" stopColor="#ED5A1A"></stop>
          <stop offset="0.656" stopColor="#ED5A1A"></stop>
          <stop offset="0.66" stopColor="#EE5B1A"></stop>
          <stop offset="0.664" stopColor="#EE5C1A"></stop>
          <stop offset="0.668" stopColor="#EE5D1A"></stop>
          <stop offset="0.672" stopColor="#EE5D1A"></stop>
          <stop offset="0.68" stopColor="#EF5E1A"></stop>
          <stop offset="0.684" stopColor="#EF5E1A"></stop>
          <stop offset="0.688" stopColor="#EF5F19"></stop>
          <stop offset="0.691" stopColor="#EF6019"></stop>
          <stop offset="0.695" stopColor="#EF6119"></stop>
          <stop offset="0.703" stopColor="#EF6119"></stop>
          <stop offset="0.711" stopColor="#EF6219"></stop>
          <stop offset="0.715" stopColor="#F06219"></stop>
          <stop offset="0.719" stopColor="#F06319"></stop>
          <stop offset="0.723" stopColor="#F06319"></stop>
          <stop offset="0.727" stopColor="#F06418"></stop>
          <stop offset="0.73" stopColor="#F06418"></stop>
          <stop offset="0.734" stopColor="#F16518"></stop>
          <stop offset="0.742" stopColor="#F16518"></stop>
          <stop offset="0.75" stopColor="#F16618"></stop>
          <stop offset="0.754" stopColor="#F16718"></stop>
          <stop offset="0.758" stopColor="#F26718"></stop>
          <stop offset="0.762" stopColor="#F26817"></stop>
          <stop offset="0.766" stopColor="#F26817"></stop>
          <stop offset="0.77" stopColor="#F36917"></stop>
          <stop offset="0.773" stopColor="#F36A17"></stop>
          <stop offset="0.777" stopColor="#F36A17"></stop>
          <stop offset="0.781" stopColor="#F36B17"></stop>
          <stop offset="0.785" stopColor="#F36B17"></stop>
          <stop offset="0.789" stopColor="#F36C17"></stop>
          <stop offset="0.793" stopColor="#F46C17"></stop>
          <stop offset="0.797" stopColor="#F46D16"></stop>
          <stop offset="0.801" stopColor="#F46D16"></stop>
          <stop offset="0.805" stopColor="#F46E16"></stop>
          <stop offset="0.809" stopColor="#F46E16"></stop>
          <stop offset="0.813" stopColor="#F46F16"></stop>
          <stop offset="0.816" stopColor="#F46F16"></stop>
          <stop offset="0.82" stopColor="#F47016"></stop>
          <stop offset="0.824" stopColor="#F47016"></stop>
          <stop offset="0.828" stopColor="#F47116"></stop>
          <stop offset="0.832" stopColor="#F47216"></stop>
          <stop offset="0.836" stopColor="#F47216"></stop>
          <stop offset="0.84" stopColor="#F47315"></stop>
          <stop offset="0.844" stopColor="#F47315"></stop>
          <stop offset="0.848" stopColor="#F47415"></stop>
          <stop offset="0.852" stopColor="#F47415"></stop>
          <stop offset="0.855" stopColor="#F47515"></stop>
          <stop offset="0.859" stopColor="#F47515"></stop>
          <stop offset="0.867" stopColor="#F57515"></stop>
          <stop offset="0.871" stopColor="#F57615"></stop>
          <stop offset="0.875" stopColor="#F57715"></stop>
          <stop offset="0.879" stopColor="#F57815"></stop>
          <stop offset="0.883" stopColor="#F57814"></stop>
          <stop offset="0.887" stopColor="#F57914"></stop>
          <stop offset="0.891" stopColor="#F57914"></stop>
          <stop offset="0.895" stopColor="#F57A14"></stop>
          <stop offset="0.898" stopColor="#F57B14"></stop>
          <stop offset="0.902" stopColor="#F57B14"></stop>
          <stop offset="0.906" stopColor="#F57C14"></stop>
          <stop offset="0.914" stopColor="#F57D14"></stop>
          <stop offset="0.922" stopColor="#F57D14"></stop>
          <stop offset="0.926" stopColor="#F57F13"></stop>
          <stop offset="0.93" stopColor="#F57F13"></stop>
          <stop offset="0.934" stopColor="#F58013"></stop>
          <stop offset="0.938" stopColor="#F58013"></stop>
          <stop offset="1" stopColor="#F58013"></stop>
        </linearGradient>
      </defs>
      <g clipPath="url(#clip-0)">
        <g clipPath="url(#clip-1)">
          <path
            fill="url(#linear-pattern-0)"
            d="m1736.55-1736.55-2794.152 2794.152L1736.551 3851.75l2794.148-2794.148Zm0 0"
          ></path>
        </g>
      </g>
    </svg>
  );
}
