import React, { FC, useEffect, useState, CSSProperties } from "react";
import { colorSwitch } from "../../../utils/switches/styleSwitches";

interface MaterialIconProps {
  size?: string;
  color?: string;
  shade?: "light" | "dark" | "main";
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  paddingLeft?: number;
  paddingRight?: number;
  className?: string;
  style?: CSSProperties;
  icon: string;
}

const MaterialIcon: FC<MaterialIconProps> = ({
  size = "24px",
  color = "primary",
  shade = "main",
  mt: marginTop,
  mb: marginBottom,
  ml: marginLeft,
  mr: marginRight,
  paddingLeft,
  paddingRight,
  className = "",
  style,
  icon,
}) => {
  const [colors, setColors] = useState<{ background?: string }>(
    colorSwitch(color, shade)
  );

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  if (!colors) {
    return null;
  }

  return (
    <span
      className={`material-icons ${className}`}
      style={{
        ...style,
        marginLeft: marginLeft && marginLeft,
        marginRight: marginRight && marginRight,
        marginBottom: marginBottom && marginBottom,
        marginTop: marginTop && marginTop,
        paddingLeft: paddingLeft && paddingLeft,
        paddingRight: paddingRight && paddingRight,
        color: colors.background || "inherit",
        fontSize: size,
      }}
    >
      {icon}
    </span>
  );
};

export default MaterialIcon;

export const ICON_OPTIONS = [
  { id: 1, name: "access_alarm" },
  { id: 2, name: "accessibility" },
  { id: 3, name: "account_balance" },
  { id: 4, name: "account_circle" },
  { id: 5, name: "add" },
  { id: 6, name: "alarm" },
  { id: 7, name: "announcement" },
  { id: 8, name: "arrow_back" },
  { id: 9, name: "arrow_downward" },
  { id: 10, name: "arrow_forward" },
  { id: 11, name: "arrow_upward" },
  { id: 12, name: "assessment" },
  { id: 13, name: "assignment" },
  { id: 14, name: "attach_file" },
  { id: 15, name: "attach_money" },
  { id: 16, name: "autorenew" },
  { id: 17, name: "backspace" },
  { id: 18, name: "backup" },
  { id: 19, name: "block" },
  { id: 20, name: "bookmark" },
  { id: 21, name: "build" },
  { id: 22, name: "cached" },
  { id: 23, name: "calendar_today" },
  { id: 24, name: "camera" },
  { id: 25, name: "cancel" },
  { id: 26, name: "check" },
  { id: 27, name: "check_circle" },
  { id: 28, name: "chevron_left" },
  { id: 29, name: "chevron_right" },
  { id: 30, name: "chrome_reader_mode" },
  { id: 31, name: "class" },
  { id: 32, name: "clear" },
  { id: 33, name: "close" },
  { id: 34, name: "cloud" },
  { id: 35, name: "cloud_upload" },
  { id: 36, name: "code" },
  { id: 37, name: "comment" },
  { id: 38, name: "compare_arrows" },
  { id: 39, name: "content_copy" },
  { id: 40, name: "content_cut" },
  { id: 41, name: "content_paste" },
  { id: 42, name: "create" },
  { id: 43, name: "dashboard" },
  { id: 44, name: "delete" },
  { id: 45, name: "description" },
  { id: 46, name: "dns" },
  { id: 47, name: "done" },
  { id: 48, name: "done_all" },
  { id: 49, name: "drafts" },
  { id: 50, name: "edit" },
  { id: 51, name: "email" },
  { id: 52, name: "error" },
  { id: 53, name: "event" },
  { id: 54, name: "event_available" },
  { id: 55, name: "event_note" },
  { id: 56, name: "exit_to_app" },
  { id: 57, name: "explore" },
  { id: 58, name: "extension" },
  { id: 59, name: "favorite" },
  { id: 60, name: "favorite_border" },
  { id: 61, name: "feedback" },
  { id: 62, name: "file_copy" },
  { id: 63, name: "filter_list" },
  { id: 64, name: "find_in_page" },
  { id: 65, name: "find_replace" },
  { id: 66, name: "flag" },
  { id: 67, name: "flight_land" },
  { id: 68, name: "flight_takeoff" },
  { id: 69, name: "format_bold" },
  { id: 70, name: "format_italic" },
  { id: 71, name: "format_list_bulleted" },
  { id: 72, name: "format_list_numbered" },
  { id: 73, name: "forum" },
  { id: 74, name: "functions" },
  { id: 75, name: "gesture" },
  { id: 76, name: "grade" },
  { id: 77, name: "group" },
  { id: 78, name: "help" },
  { id: 79, name: "help_outline" },
  { id: 80, name: "highlight_off" },
  { id: 81, name: "history" },
  { id: 82, name: "home" },
  { id: 83, name: "info" },
  { id: 84, name: "info_outline" },
  { id: 85, name: "input" },
  { id: 86, name: "invert_colors" },
  { id: 87, name: "label" },
  { id: 88, name: "label_important" },
  { id: 89, name: "language" },
  { id: 90, name: "launch" },
  { id: 91, name: "line_style" },
  { id: 92, name: "link" },
  { id: 93, name: "list" },
  { id: 94, name: "lock" },
  { id: 95, name: "lock_open" },
  { id: 96, name: "mail" },
  { id: 97, name: "mail_outline" },
  { id: 98, name: "map" },
  { id: 99, name: "maximize" },
  { id: 100, name: "menu" },
  { id: 101, name: "minimize" },
  { id: 102, name: "more_horiz" },
  { id: 103, name: "more_vert" },
  { id: 104, name: "notifications" },
  { id: 105, name: "notifications_active" },
  { id: 106, name: "notifications_none" },
  { id: 107, name: "notifications_off" },
  { id: 108, name: "notifications_paused" },
  { id: 109, name: "open_in_browser" },
  { id: 110, name: "open_in_new" },
  { id: 111, name: "pageview" },
  { id: 112, name: "palette" },
  { id: 113, name: "pause" },
  { id: 114, name: "person" },
  { id: 115, name: "person_add" },
  { id: 116, name: "phone" },
  { id: 117, name: "photo_camera" },
  { id: 118, name: "playlist_add" },
  { id: 119, name: "power_settings_new" },
  { id: 120, name: "print" },
  { id: 121, name: "public" },
  { id: 122, name: "question_answer" },
  { id: 123, name: "refresh" },
  { id: 124, name: "remove" },
  { id: 125, name: "reply" },
  { id: 126, name: "save" },
  { id: 127, name: "search" },
  { id: 128, name: "security" },
  { id: 129, name: "send" },
  { id: 130, name: "settings" },
  { id: 131, name: "shopping_cart" },
  { id: 132, name: "show_chart" },
  { id: 133, name: "shuffle" },
  { id: 134, name: "smartphone" },
  { id: 135, name: "sort" },
  { id: 136, name: "star" },
  { id: 137, name: "star_border" },
  { id: 138, name: "stop" },
  { id: 139, name: "subject" },
  { id: 140, name: "supervisor_account" },
  { id: 141, name: "swap_horiz" },
  { id: 142, name: "swap_vert" },
  { id: 143, name: "sync" },
  { id: 144, name: "system_update_alt" },
  { id: 145, name: "tab" },
  { id: 146, name: "text_fields" },
  { id: 147, name: "thumb_down" },
  { id: 148, name: "thumb_up" },
  { id: 149, name: "timeline" },
  { id: 150, name: "toc" },
  { id: 151, name: "today" },
  { id: 152, name: "toll" },
  { id: 153, name: "touch_app" },
  { id: 154, name: "translate" },
  { id: 155, name: "trending_down" },
  { id: 156, name: "trending_up" },
  { id: 157, name: "update" },
  { id: 158, name: "verified_user" },
  { id: 159, name: "view_list" },
  { id: 160, name: "visibility" },
  { id: 161, name: "voice_chat" },
  { id: 162, name: "volume_down" },
  { id: 163, name: "volume_off" },
  { id: 164, name: "volume_up" },
  { id: 165, name: "warning" },
  { id: 166, name: "watch" },
  { id: 167, name: "work" },
  { id: 168, name: "work_off" },
  { id: 169, name: "work_outline" },
  { id: 170, name: "zoom_in" },
  { id: 171, name: "zoom_out" },
  { id: 172, name: "add_circle" },
  { id: 173, name: "add_circle_outline" },
  { id: 174, name: "apps" },
  { id: 175, name: "call" },
  { id: 176, name: "cancel_schedule_send" },
  { id: 177, name: "check_box" },
  { id: 178, name: "check_box_outline_blank" },
  { id: 179, name: "clear_all" },
  { id: 180, name: "crop" },
  { id: 181, name: "drag_handle" },
  { id: 182, name: "emoji_emotions" },
  { id: 183, name: "emoji_events" },
  { id: 184, name: "emoji_flags" },
  { id: 185, name: "emoji_objects" },
  { id: 186, name: "emoji_people" },
  { id: 187, name: "emoji_symbols" },
  { id: 188, name: "emoji_transportation" },
  { id: 189, name: "fiber_manual_record" },
  { id: 190, name: "format_color_text" },
  { id: 191, name: "format_paint" },
  { id: 192, name: "functions" },
  { id: 193, name: "gesture" },
  { id: 194, name: "insert_link" },
  { id: 195, name: "local_airport" },
  { id: 196, name: "local_atm" },
  { id: 197, name: "local_bar" },
  { id: 198, name: "local_cafe" },
  { id: 199, name: "local_dining" },
  { id: 200, name: "local_gas_station" },
];
