package com.autenticador

import android.os.Bundle
import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import java.io.File

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Autenticador"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    createNotificationChannel()
  }

  private fun createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val name = "Descargas"
      val descriptionText = "Canal para notificaciones de descargas"
      val importance = NotificationManager.IMPORTANCE_DEFAULT
      val channel = NotificationChannel("download-channel", name, importance).apply {
        description = descriptionText
      }
      // Registrar el canal con el sistema
      val notificationManager: NotificationManager =
        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      notificationManager.createNotificationChannel(channel)
    }
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    handleIntent(intent)
  }

  private fun handleIntent(intent: Intent) {
    val filePath = intent.getStringExtra("FILE_PATH")
    if (filePath != null) {
      openFile(filePath)
    }
  }

  private fun openFile(filePath: String) {
    val file = File(filePath)
    val uri = FileProvider.getUriForFile(
      this,
      "${applicationContext.packageName}.provider",
      file
    )
    val intent = Intent(Intent.ACTION_VIEW).apply {
      setDataAndType(uri, getMimeType(filePath))
      addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
    }
    startActivity(Intent.createChooser(intent, "Abrir archivo con"))
  }

  private fun getMimeType(filePath: String): String {
    return when {
      filePath.endsWith(".pdf") -> "application/pdf"
      filePath.endsWith(".doc") || filePath.endsWith(".docx") -> "application/msword"
      filePath.endsWith(".xls") || filePath.endsWith(".xlsx") -> "application/vnd.ms-excel"
      filePath.endsWith(".jpg") || filePath.endsWith(".jpeg") -> "image/jpeg"
      filePath.endsWith(".png") -> "image/png"
      else -> "*/*"
    }
  }
}