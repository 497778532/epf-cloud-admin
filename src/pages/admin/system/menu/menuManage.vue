<template>
  <div id="menuManage">
    <el-container>
      <el-aside width="300px"
                style="padding-top:10px;padding-left:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">菜单</el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-button size="mini"
                       @click="addLevelOne">添加</el-button>
          </div>
          <el-main v-loading="loading"
                   element-loading-text="数据加载中"
                   element-loading-background="rgba(255, 255, 255,0.95)"
                   :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderRight':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderLeft':'1px solid rgb(224, 224, 224)'}">
            <el-tree :data="data4"
                     v-loading="loading"
                     element-loading-text="数据加载中"
                     element-loading-background="rgba(255, 255, 255,0.95)"
                     :props="defaultProps"
                     node-key="id"
                     :expand-on-click-node="false"
                     class="menuManage_List"
                     :render-content="renderContent"
                     @node-drag-end="handleDragEnd"
                     draggable>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-main style="margin-left:15px;padding-top:10px;padding-right:20px;">
        <el-container>
          <el-header :style="{background:theme_BackgroundColor,color:theme_TextColor}"
                     class="m_title">菜单信息</el-header>
          <div style="height:40px;padding:6px 22px;background:rgb(224, 224, 224);">
            <el-button size="mini"
                       @click="saveMenu">保存</el-button>
            <el-button size="mini"
                       @click="deleteMenu">删除</el-button>
          </div>
          <el-main :style="{'height':menuListHeight + 'px','paddingTop':'10px','borderLeft':'1px solid rgb(224, 224, 224)','borderBottom':'1px solid rgb(224, 224, 224)','borderRight':'1px solid rgb(224, 224, 224)'}">
            <!-- <el-row>
                        <el-col :span="3">菜单名称</el-col>
                        <el-col :offset="1" :span="7">222</el-col>
                        <el-col :offset="2" :span="3">111</el-col>
                        <el-col :offset="1" :span="7">222</el-col>
                    </el-row> -->
            <el-form ref="form"
                     :rules="rules"
                     :model="form"
                     label-width="80px"
                     size="small">
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="菜单名称"
                                prop="menuname">
                    <el-input v-model="form.menuname"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="资源类型">
                    <el-select v-model="form.type"
                               placeholder="请选择资源类型">
                      <el-option label="子系统"
                                 value="systems"></el-option>
                      <el-option label="目录"
                                 value="mulu"></el-option>
                      <el-option label="页面"
                                 value="yemian"></el-option>
                      <el-option label="页面组件"
                                 value="yemianzujian"></el-option>
                      <el-option label="接口/功能"
                                 value="jiekou/gongneng"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="资源">
                    <el-input v-model="form.resourceId"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="资源路径">
                    <el-input v-model="form.url"
                              required
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="打开状态">
                    <el-select v-model="form.state"
                               v-if="form.state"
                               placeholder="请选择资源类型">
                      <el-option label="关闭"
                                 value="off"></el-option>
                      <el-option label="打开"
                                 value="on"></el-option>
                    </el-select>

                    <el-select v-model="form.state"
                               v-else
                               placeholder="请选择资源类型">
                      <el-option label="关闭"
                                 value="off"></el-option>
                      <el-option label="打开"
                                 value="on"></el-option>
                    </el-select>

                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="父节点">
                    <el-cascader v-model="form.parentId"
                                 :options="data4"
                                 :props="{label:'menuname',value:'id',children:'childMenu',checkStrictly:true,emitPath:false}"
                                 @change="filterSelect"
                                 placeholder="请选择或搜索"
                                 clearable>
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="菜单类型">
                    <el-select v-model="form.menuType"
                               placeholder="请选择资源类型">
                      <el-option label="左边菜单"
                                 value="zuobiancaidan"></el-option>

                      <el-option label="首页快捷方式"
                                 value="shouyekuaijiefangshi"></el-option>
                      <el-option label="导航菜单"
                                 value="daohangcaidan"></el-option>
                      <el-option label="按钮"
                                 value="button"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="菜单图标">
                    <el-button :type="form.iconCls?'info':'primary'"
                               plain
                               @click="dialogVisible = true">{{form.iconCls?'更改图标':'选择图标'}}</el-button>
                    <span :class="[form.idx % 2 == 0?'menuiconColor1':'menuiconColor2',form.idx % 3 == 0?'menuiconColor3':'',form.idx % 4 == 0?'menuiconColor4':'','menuIconAll']">
                      <i :class="form.iconCls"></i>
                    </span>

                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>

                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="授权标识">
                    <el-input v-model="form.permissCode"
                              :maxlength="50"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :offset="1"
                        :span="9">
                  <el-form-item label="排序">
                    <el-input-number v-model="form.rank"
                                     controls-position="right"
                                     :min="1"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog title="请选择图标"
               :visible.sync="dialogVisible"
               :before-close="handleClose"
               lock-scroll
               width="60%"
               top="1%">
      <div class="iconList">
        <div class="menuIconBox"
             v-for="(item, index) in fontAwesomeList"
             :key="index">
          <p class="iconListTitle"><i class="fa fa-angle-right"
               style="margin-right:10px;"></i>{{item.title}}</p>
          <div class="listFlexBox">
            <!-- <div :class="[idx % 2 == 0?'iconColor1':'iconColor2',idx % 3 == 0?'iconColor3':'',idx % 4 == 0?'iconColor4':'','iconitem']" @click="changeicon(icon,idx)"  v-for="(icon, idx) in item.iconList" :key="idx"> -->
            <div :class="['iconColor'+Math.floor(Math.random()*(5-1)+1), 'iconitem']"
                 @click="changeicon(icon,idx)"
                 v-for="(icon, idx) in item.iconList"
                 :key="idx">
              <i :class="'fa fa-'+icon"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
let id = 1000;
export default {
  name: 'menuManage',
  data () {
    return {
      fontAwesomeList: [
        {
          title: '常用图标',
          iconList: ["address-book", "address-book-o", "address-card", "address-card-o", "adjust", "american-sign-language-interpreting", "anchor", "archive", "area-chart", "arrows", "arrows-h", "arrows-v", "asl-interpreting", "assistive-listening-systems", "asterisk", "at", "audio-description", "automobile", "balance-scale", "ban", "bank", "bar-chart", "bar-chart-o", "barcode", "bars", "bath", "bathtub", "battery", "battery-0", "battery-1", "battery-2", "battery-3", "battery-4", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bed", "beer", "bell", "bell-o", "bell-slash", "bell-slash-o", "bicycle", "binoculars", "birthday-cake", "blind", "bluetooth", "bluetooth-b", "bolt", "bomb", "book", "bookmark", "bookmark-o", "braille", "briefcase", "bug", "building", "building-o", "bullhorn", "bullseye", "bus", "cab", "calculator", "calendar", "calendar-check-o", "calendar-minus-o", "calendar-o", "calendar-plus-o", "calendar-times-o", "camera", "camera-retro", "car", "caret-square-o-down", "caret-square-o-left", "caret-square-o-right", "caret-square-o-up", "cart-arrow-down", "cart-plus", "cc", "certificate", "check", "check-circle", "check-circle-o", "check-square", "check-square-o", "child", "circle", "circle-o", "circle-o-notch", "circle-thin", "clock-o", "clone", "close", "cloud", "cloud-download", "cloud-upload", "code", "code-fork", "coffee", "cog", "cogs", "comment", "comment-o", "commenting", "commenting-o", "comments", "comments-o", "compass", "copyright", "creative-commons", "credit-card", "credit-card-alt", "crop", "crosshairs", "cube", "cubes", "cutlery", "dashboard", "database", "deaf", "deafness", "desktop", "diamond", "dot-circle-o", "download", "drivers-license", "drivers-license-o", "edit", "ellipsis-h", "ellipsis-v", "envelope", "envelope-o", "envelope-open", "envelope-open-o", "envelope-square", "eraser", "exchange", "exclamation", "exclamation-circle", "exclamation-triangle", "external-link", "external-link-square", "eye", "eye-slash", "eyedropper", "fax", "feed", "female", "fighter-jet", "file-archive-o", "file-audio-o", "file-code-o", "file-excel-o", "file-image-o", "file-movie-o", "file-pdf-o", "file-photo-o", "file-picture-o", "file-powerpoint-o", "file-sound-o", "file-video-o", "file-word-o", "file-zip-o", "film", "filter", "fire", "fire-extinguisher", "flag", "flag-checkered", "flag-o", "flash", "flask", "folder", "folder-o", "folder-open", "folder-open-o", "frown-o", "futbol-o", "gamepad", "gavel", "gear", "gears", "gift", "glass", "globe", "graduation-cap", "group", "hand-grab-o", "hand-lizard-o", "hand-paper-o", "hand-peace-o", "hand-pointer-o", "hand-rock-o", "hand-scissors-o", "hand-spock-o", "hand-stop-o", "handshake-o", "hard-of-hearing", "hashtag", "hdd-o", "headphones", "heart", "heart-o", "heartbeat", "history", "home", "hotel", "hourglass", "hourglass-1", "hourglass-2", "hourglass-3", "hourglass-end", "hourglass-half", "hourglass-o", "hourglass-start", "i-cursor", "id-badge", "id-card", "id-card-o", "image", "inbox", "industry", "info", "info-circle", "institution", "key", "keyboard-o", "language", "laptop", "leaf", "legal", "lemon-o", "level-down", "level-up", "life-bouy", "life-buoy", "life-ring", "life-saver", "lightbulb-o", "line-chart", "location-arrow", "lock", "low-vision", "magic", "magnet", "mail-forward", "mail-reply", "mail-reply-all", "male", "map", "map-marker", "map-o", "map-pin", "map-signs", "meh-o", "microchip", "microphone", "microphone-slash", "minus", "minus-circle", "minus-square", "minus-square-o", "mobile", "mobile-phone", "money", "moon-o", "mortar-board", "motorcycle", "mouse-pointer", "music", "navicon", "newspaper-o", "object-group", "object-ungroup", "paint-brush", "paper-plane", "paper-plane-o", "paw", "pencil", "pencil-square", "pencil-square-o", "percent", "phone", "phone-square", "photo", "picture-o", "pie-chart", "plane", "plug", "plus", "plus-circle", "plus-square", "plus-square-o", "podcast", "power-off", "print", "puzzle-piece", "qrcode", "question", "question-circle", "question-circle-o", "quote-left", "quote-right", "random", "recycle", "refresh", "registered", "remove", "reorder", "reply", "reply-all", "retweet", "road", "rocket", "rss", "rss-square", "s15", "search", "search-minus", "search-plus", "send", "send-o", "server", "share", "share-alt", "share-alt-square", "share-square", "share-square-o", "shield", "ship", "shopping-bag", "shopping-basket", "shopping-cart", "shower", "sign-in", "sign-language", "sign-out", "signal", "signing", "sitemap", "sliders", "smile-o", "snowflake-o", "soccer-ball-o", "sort", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-asc", "sort-desc", "sort-down", "sort-numeric-asc", "sort-numeric-desc", "sort-up", "space-shuttle", "spinner", "spoon", "square", "square-o", "star", "star-half", "star-half-empty", "star-half-full", "star-half-o", "star-o", "sticky-note", "sticky-note-o", "street-view", "suitcase", "sun-o", "support", "tablet", "tachometer", "tag", "tags", "tasks", "taxi", "television", "terminal", "thermometer", "thermometer-0", "thermometer-1", "thermometer-2", "thermometer-3", "thermometer-4", "thermometer-empty", "thermometer-full", "thermometer-half", "thermometer-quarter", "thermometer-three-quarters", "thumb-tack", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up", "ticket", "times", "times-circle", "times-circle-o", "times-rectangle", "times-rectangle-o", "tint", "toggle-down", "toggle-left", "toggle-off", "toggle-on", "toggle-right", "toggle-up", "trademark", "trash", "trash-o", "tree", "trophy", "truck", "tty", "tv", "umbrella", "universal-access", "university", "unlock", "unlock-alt", "unsorted", "upload", "user", "user-circle", "user-circle-o", "user-o", "user-plus", "user-secret", "user-times", "users", "vcard", "vcard-o", "video-camera", "volume-control-phone", "volume-down", "volume-off", "volume-up", "warning", "wheelchair", "wheelchair-alt", "wifi", "window-close", "window-close-o", "window-maximize", "window-minimize", "window-restore", "wrench"]
        },
        {
          title: '辅助功能图标',
          iconList: ["american-sign-language-interpreting", "asl-interpreting", "assistive-listening-systems", "audio-description", "blind", "braille", "cc", "deaf", "deafness", "hard-of-hearing", "low-vision", "question-circle-o", "sign-language", "signing", "tty", "universal-access", "volume-control-phone", "wheelchair", "wheelchair-alt"]
        },
        {
          title: '手势动作图标',
          iconList: ["hand-grab-o", "hand-lizard-o", "hand-o-down", "hand-o-left", "hand-o-right", "hand-o-up", "hand-paper-o", "hand-peace-o", "hand-pointer-o", "hand-rock-o", "hand-scissors-o", "hand-spock-o", "hand-stop-o", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up"]
        },
        {
          title: '运输交通图标',
          iconList: ["ambulance", "automobile", "bicycle", "bus", "cab", "car", "fighter-jet", "motorcycle", "plane", "rocket", "ship", "space-shuttle", "subway", "taxi", "train", "truck", "wheelchair", "wheelchair-alt"]
        },
        {
          title: '性别类图标',
          iconList: ["genderless", "intersex", "mars", "mars-double", "mars-stroke", "mars-stroke-h", "mars-stroke-v", "mercury", "neuter", "transgender", "transgender-alt", "venus", "venus-double", "venus-mars"]
        },
        {
          title: '文件类型图标',
          iconList: ["file", "file-archive-o", "file-audio-o", "file-code-o", "file-excel-o", "file-image-o", "file-movie-o", "file-o", "file-pdf-o", "file-photo-o", "file-picture-o", "file-powerpoint-o", "file-sound-o", "file-text", "file-text-o", "file-video-o", "file-word-o", "file-zip-o"]
        },
        {
          title: '旋转类图标',
          iconList: ["circle-o-notch", "cog", "gear", "refresh", "spinner"]
        },
        {
          title: '表单控制类图标',
          iconList: ["check-square", "check-square-o", "circle", "circle-o", "dot-circle-o", "minus-square", "minus-square-o", "plus-square", "plus-square-o", "square", "square-o"]
        },
        {
          title: '网银支付类图标',
          iconList: ["cc-amex", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "credit-card", "credit-card-alt", "google-wallet", "paypal"]
        },
        {
          title: '图表类图标',
          iconList: ["area-chart", "bar-chart", "bar-chart-o", "line-chart", "pie-chart"]
        },
        {
          title: '货币类图标',
          iconList: ["bitcoin", "btc", "cny", "dollar", "eur", "euro", "gbp", "gg", "gg-circle", "ils", "inr", "jpy", "krw", "money", "rmb", "rouble", "rub", "ruble", "rupee", "shekel", "sheqel", "try", "turkish-lira", "usd", "won", "yen"]
        },
        {
          title: '文字编辑器图标',
          iconList: ["align-center", "align-justify", "align-left", "align-right", "bold", "chain ", "chain-broken", "clipboard", "columns", "copy ", "cut ", "dedent ", "eraser", "file", "file-o", "file-text", "file-text-o", "files-o", "floppy-o", "font", "header", "indent", "italic", "link", "list", "list-alt", "list-ol", "list-ul", "outdent", "paperclip", "paragraph", "paste ", "repeat", "rotate-left ", "rotate-right ", "save ", "scissors", "strikethrough", "subscript", "superscript", "table", "text-height", "text-width", "th", "th-large", "th-list", "underline", "undo", "unlink"]
        },
        {
          title: '方向箭头图标',
          iconList: ["angle-double-down", "angle-double-left", "angle-double-right", "angle-double-up", "angle-down", "angle-left", "angle-right", "angle-up", "arrow-circle-down", "arrow-circle-left", "arrow-circle-o-down", "arrow-circle-o-left", "arrow-circle-o-right", "arrow-circle-o-up", "arrow-circle-right", "arrow-circle-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "arrows", "arrows-alt", "arrows-h", "arrows-v", "caret-down", "caret-left", "caret-right", "caret-square-o-down", "caret-square-o-left", "caret-square-o-right", "caret-square-o-up", "caret-up", "chevron-circle-down", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "exchange", "hand-o-down", "hand-o-left", "hand-o-right", "hand-o-up", "long-arrow-down", "long-arrow-left", "long-arrow-right", "long-arrow-up", "toggle-down", "toggle-left", "toggle-right", "toggle-up"]
        },
        {
          title: '视频播放器图标',
          iconList: ["arrows-alt", "backward", "compress", "eject", "expand", "fast-backward", "fast-forward", "forward", "pause", "pause-circle", "pause-circle-o", "play", "play-circle", "play-circle-o", "random", "step-backward", "step-forward", "stop", "stop-circle", "stop-circle-o", "youtube-play"]
        },
        {
          title: '品牌类图标',
          iconList: ["500px", "adn", "amazon", "android", "angellist", "apple", "bandcamp", "behance", "behance-square", "bitbucket", "bitbucket-square", "bitcoin", "black-tie", "bluetooth", "bluetooth-b", "btc", "buysellads", "cc-amex", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "chrome", "codepen", "codiepie", "connectdevelop", "contao", "css3", "dashcube", "delicious", "deviantart", "digg", "dribbble", "dropbox", "drupal", "edge", "eercast", "empire", "envira", "etsy", "expeditedssl", "fa", "facebook", "facebook-f", "facebook-official", "facebook-square", "firefox", "first-order", "flickr", "font-awesome", "fonticons", "fort-awesome", "forumbee", "foursquare", "free-code-camp", "ge", "get-pocket", "gg", "gg-circle", "git", "git-square", "github", "github-alt", "github-square", "gitlab", "gittip", "glide", "glide-g", "google", "google-plus", "google-plus-circle", "google-plus-official", "google-plus-square", "google-wallet", "gratipay", "grav", "hacker-news", "houzz", "html5", "imdb", "instagram", "internet-explorer", "ioxhost", "joomla", "jsfiddle", "lastfm", "lastfm-square", "leanpub", "linkedin", "linkedin-square", "linode", "linux", "maxcdn", "meanpath", "medium", "meetup", "mixcloud", "modx", "odnoklassniki", "odnoklassniki-square", "opencart", "openid", "opera", "optin-monster", "pagelines", "paypal", "pied-piper", "pied-piper-alt", "pied-piper-pp", "pinterest", "pinterest-p", "pinterest-square", "product-hunt", "qq", "quora", "ra", "ravelry", "rebel", "reddit", "reddit-alien", "reddit-square", "renren", "resistance", "safari", "scribd", "sellsy", "share-alt", "share-alt-square", "shirtsinbulk", "simplybuilt", "skyatlas", "skype", "slack", "slideshare", "snapchat", "snapchat-ghost", "snapchat-square", "soundcloud", "spotify", "stack-exchange", "stack-overflow", "steam", "steam-square", "stumbleupon", "stumbleupon-circle", "superpowers", "telegram", "tencent-weibo", "themeisle", "trello", "tripadvisor", "tumblr", "tumblr-square", "twitch", "twitter", "twitter-square", "usb", "viacoin", "viadeo", "viadeo-square", "vimeo", "vimeo-square", "vine", "vk", "wechat", "weibo", "weixin", "whatsapp", "wikipedia-w", "windows", "wordpress", "wpbeginner", "wpexplorer", "wpforms", "xing", "xing-square", "y-combinator", "y-combinator-square", "yahoo", "yc", "yc-square", "yelp", "yoast", "youtube", "youtube-play", "youtube-square"]
        },
        {
          title: '医疗类图标',
          iconList: ["ambulance", "h-square", "heart", "heart-o", "heartbeat", "hospital-o", "medkit", "plus-square", "stethoscope", "user-md", "wheelchair", "wheelchair-alt"]
        }
      ],
      rules: {
        menuname: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },

        ]
      },
      data4: [],
      loading: true,
      defaultProps: {
        children: 'childMenu',
        label: 'menuname'
      },
      newName: '1',
      form: {
        id: '',
        menuname: '',
        resourceId: '',
        url: '',
        state: 'on',
        startType: false,
        menuType: '',
        permissCode: '',
        rank: 1,
        parentMenu: '',
        iconCls: '',
        type: '',
        idx: 0,
      },
      menuListHeight: 100,
      dialogVisible: false,
      currentNode: '',
      currentData: '',
      needParams: ['menuname', 'resourceId', 'url', 'state', 'startType', 'menuType', 'permissCode', 'rank', 'iconCls', 'parentId', 'id', 'type'],

      //按钮组、主题
      buttons: [],
      theme_BackgroundColor: '',
      theme_TextColor: ''
    }
  },
  created () {
    this.menuListHeight = window.innerHeight - 261;
    this.buttons = JSON.parse(localStorage.getItem("infoMenuManage"));
    this.theme_BackgroundColor = localStorage.getItem("theme_BackgroundColor");
    this.theme_TextColor = localStorage.getItem("theme_TextColor");
    this.laodmenus();
  },
  mounted () {
    this.$bus.$on('themChange', val => {
      this.theme_BackgroundColor = val.menuBackgroundColor
      this.theme_TextColor = val.textColor
    })
  },
  methods: {
    filterSelect () {
      console.log('这是选中节点的ID：', this.form.parentId)
    },
    laodmenus () {
      this.loading = true
      this.$get('/epf-admin/admin/menu/getAllMenuList').then(res => {
        if (res.code != '0') {
          this.$message.error(res.msg) // 失败
          this.loading = false
          return
        }
        this.data4 = res.menus;
        this.loading = false
      })
    },
    changeicon (icon, idx) {
      this.form.iconCls = 'fa fa-' + icon;
      this.form.idx = idx;
      this.dialogVisible = false;
    },
    append (node, data) {
      console.log(node, data);

      if (!node.expanded) {
        node.expanded = true;
      }
      const newChild = { id: 'newMenu', menuname: '', childMenu: [] };
      if (!data.childMenu) {
        this.$set(data, 'childMenu', []);
      }
      data.childMenu.push(newChild);
    },
    addLevelOne () {
      const newMenu = { id: 'newMenu', menuname: '', childMenu: [] };
      this.data4.push(newMenu);
    },
    remove (node, data) {
      if (data.childMenu.length > 0) {
        this.$message.error("请先删除子菜单！");//失败
        return;
      }
      this.currentNode = node;
      this.deleteMenu();
    },
    setName (node, data) {
      console.log(node, data);
      data.menuname = document.getElementById(node.id + 'Name').value
    },
    getMenuInfo (node, data) {
      this.currentNode = node;
      this.currentData = data;
      this.form = data;
      console.log(this.form);
      this.form.parentMenu = node.parent.label;
      this.form.parentId = node.parent.key;
    },
    onSubmit () {
      console.log('submit!');
    },
    handleClose (done) {
      //隐藏dialog
      this.dialogVisible = false;
    },
    saveMenu () {
      var that = this
      this.currentData = this.form.parentId
      let paramsData = {};
      for (let index = 0; index < that.needParams.length; index++) {
        paramsData[that.needParams[index]] = that.form[that.needParams[index]]
      }
      console.log(paramsData);
      if (paramsData.id == 'newMenu') {
        paramsData.id = null;
      }
      if (!paramsData.menuname) {
        this.$message.warning("菜单名称不能为空！");
        return;
      }
      that.$post('/epf-admin/admin/menu/save', paramsData).then(res => {
        if (res.code != '0') {
          that.$message.error(res.msg);//失败
          return
        }
        that.form.id = res.menu.id
        that.currentData = res.menu;
        that.laodmenus();
        that.$message.success("保存成功!");
      })
    },
    deleteMenu () {
      let that = this;
      const parent = that.currentNode.parent;
      if (typeof (parent) == "undefined" || parent == "") {
        this.$message({
          message: '请选中左边菜单！',
          type: 'warning'
        });
        return;
      }
      that.$confirm("确认要删除信息吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        // type: "warning",
        center: true
      }).then(() => {
        const childMenu = parent.data.childMenu || parent.data;
        var id = that.currentData.id;
        that.$post('/epf-admin/admin/menu/delete', { id: id }).then(res => {
          if (res.code == 0) {
            that.$message.success("删除成功!");
          } else {
            that.$message.error(res.msg);
          }

        })
        const index = childMenu.findIndex(d => d.id === id);
        childMenu.splice(index, 1);
      }).catch(() => {
        that.$message({ type: "info", message: "已取消删除" });
      });

    },
    renderContent (h, { node, data, store }) {
      var createElement = arguments[0];
      var level = arguments[1].node.level;
      if (node.label) {
        return (
          <span on-click={() => this.getMenuInfo(node, data)} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
              <i class={data.iconCls} style="padding-right:5px;"></i>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 16px;padding:0px;color:#409EFF;" type="text" on-click={() => this.append(node, data)}><i class="el-icon-circle-plus-outline"></i></el-button>
              <el-button style="font-size: 16px;color:#F56C6C;" type="text" on-click={() => this.remove(node, data)}><i class="el-icon-delete"></i></el-button>
            </span>
          </span>);
      } else {
        return (
          <span on-click={() => this.getMenuInfo(node, data)} style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;height:26px;overflow:hidden;">
            <span>
              <span><input id={node.id + 'Name'} readonly type="text" placeholder="请在右边输入..." autofocus /></span>
            </span>
            <span>
              <el-button style="font-size: 16px;padding:0px;color:#67C23A;" type="text" on-click={() => this.setName(node, data)}><i class="el-icon-circle-check-outline"></i></el-button>
              <el-button style="font-size: 16px;color:#F56C6C;" type="text" on-click={() => this.remove(node, data)}><i class="el-icon-delete"></i></el-button>
            </span>
          </span>);
      }
    },

    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', draggingNode, dropNode, dropType, ev);
      var menuId = draggingNode.data.id;
      var pId = "";
      if (dropType !== "inner") {
        pId = dropNode.data.id;
      } else {
        pId = dropNode.data.pId;
      }

      var paramsData = { id: menuId, parentId: pId };
      this.$post('epf-admin/admin/menu/update', paramsData).then(res => {
        if (res.code == 0) {
          this.$message.warning("保存成功！");
        } else {
          this.$message.warning(res.msg);
        }
        this.laodmenus()
      })
    }
  }
}
</script>

<style scoped>
.m_title {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 30px;
  background: rgb(50, 58, 64);
  color: #fff;
  font-size: 16px;
}
.el-tree > div {
  margin: 5px 0;
}
.iconList {
  height: 350px;
  background: #fff;
  overflow-y: auto;
}
.iconListTitle {
  margin: 10px;
  font-size: 20px;
  font-weight: 800;
  color: rgb(128, 128, 128);
}
.iconListTitle:nth-child(1) {
  margin-top: 0px;
}
.listFlexBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.iconitem {
  width: 50px;
  height: 50px;
  text-align: center;
  margin: 5px 5px;
  border: 1px solid rgb(233, 233, 233);
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.menuIconAll {
  margin-left: 5px;
  padding: 0 5px;
  font-size: 32px;
  position: absolute;
  left: 85px;
  top: 0;
  border-radius: 3px;
}
.menuiconColor1 {
  color: #ff6600;
}
.menuiconColor2 {
  color: #009966;
}
.menuiconColor3 {
  color: #ff0033 !important;
}
.menuiconColor4 {
  color: #0066cc !important;
}
.iconColor1:hover {
  background: #ff6600;
  color: #fff;
}
.iconColor2:hover {
  background: #009966;
  color: #fff;
}
.iconColor3:hover {
  background: #ff0033 !important;
  color: #fff;
}
.iconColor4:hover {
  background: #0066cc !important;
  color: #fff;
}
.iconitem:hover {
  transform: scale(1.2);
}
.iconitem i {
  font-size: 30px;
  line-height: 50px;
}
</style>
<style>
.menuManage_List .el-tree-node__content {
  margin-bottom: 5px;
}
</style>


